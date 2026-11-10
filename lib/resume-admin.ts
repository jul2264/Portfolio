import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { redis, redisConfigured } from '@/lib/resume-store';

const sessionCookie = 'portfolio-resume-admin';
const sessionSeconds = 60 * 60 * 4;
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

export function adminConfig() {
  const slug = process.env.RESUME_ADMIN_SLUG ?? '';
  const passwordHash = process.env.RESUME_ADMIN_PASSWORD_SHA256 ?? '';
  if (!/^[a-z0-9-]{24,80}$/.test(slug) || !/^[a-f0-9]{64}$/.test(passwordHash) || !redisConfigured()) return null;
  return { slug, passwordHash, path: `/studio/${slug}` };
}

const loginLimitScript = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], 600) end
return count
`;

export async function signIn(password: string) {
  const config = adminConfig();
  if (!config || password.length > 256) return false;

  const requestHeaders = await headers();
  const ip = requestHeaders.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const limitKey = `portfolio:resume:attempt:${sha256(`${config.slug}:${ip}`)}`;
  const count = await redis('EVAL', loginLimitScript, 1, limitKey);
  if (typeof count !== 'number' || count > 10) return false;
  if (!timingSafeEqual(Buffer.from(sha256(password), 'hex'), Buffer.from(config.passwordHash, 'hex'))) return false;

  const token = randomBytes(32).toString('hex');
  const result = await redis('SET', sessionKey(token, config.passwordHash), 'active', 'EX', sessionSeconds);
  if (result !== 'OK') throw new Error('Unable to store session');
  const jar = await cookies();
  jar.set(sessionCookie, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: config.path,
    maxAge: sessionSeconds,
  });
  return true;
}

function sessionKey(token: string, passwordHash: string) {
  return `portfolio:resume:session:${sha256(`${passwordHash}:${token}`)}`;
}

export async function currentSessionKey() {
  const config = adminConfig();
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!config || !token || !/^[a-f0-9]{64}$/.test(token)) return null;
  return sessionKey(token, config.passwordHash);
}

export async function hasSession() {
  const key = await currentSessionKey();
  return key !== null && await redis('GET', key) === 'active';
}

export async function signOut() {
  const config = adminConfig();
  if (!config) return;
  const key = await currentSessionKey();
  if (key) await redis('DEL', key);
  (await cookies()).set(sessionCookie, '', { path: config.path, maxAge: 0 });
}
