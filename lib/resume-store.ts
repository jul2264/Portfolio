import { randomUUID } from 'node:crypto';
import { projectsData, resumeData, skillsData } from '@/lib/data';

export const resumeTextLimit = 24_000;
const documentKey = 'portfolio:resume:v1';
const { personal, experience, education, leadership, achievements } = resumeData;
const initialText = [
  personal.name,
  personal.title,
  [personal.email, personal.linkedin, personal.github].join(' · '),
  '',
  '## Experience',
  ...experience.map((item) => [
    `${item.role} · ${item.company}`,
    `${item.period} · ${item.location}`,
    ...item.highlights.map((line) => `• ${line}`),
    '',
  ].join('\n')),
  '## Projects',
  ...projectsData.featured.map((item) => [
    `${item.title} · ${item.period}`,
    item.summary,
    ...item.keyFeatures.map((line) => `• ${line}`),
    '',
  ].join('\n')),
  '## Technical skills',
  ...skillsData.map(({ category, skills }) => `${category}: ${skills.join(', ')}`),
  '',
  '## Education',
  ...education.map((item) => `${item.institution} · ${item.degree} · ${item.grade} · ${item.period}`),
  '',
  '## Leadership',
  ...leadership.map((item) => `${item.role} · ${item.organization} · ${item.period}\n${item.highlights.join('\n')}\n`),
  '## Achievements',
  ...achievements.map((line) => `• ${line}`),
].join('\n');

interface ResumeDocument {
  text: string;
  revision: string;
}

export function redisConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export async function redis(...command: (string | number)[]): Promise<unknown> {
  const endpoint = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!endpoint || !token) throw new Error('Résumé storage is not configured');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) throw new Error('Résumé storage request failed');
  const payload = await response.json();
  if (!Object.hasOwn(payload, 'result')) throw new Error('Résumé storage command failed');
  return payload.result;
}

export async function readResume(): Promise<ResumeDocument> {
  const initial = { text: initialText, revision: 'initial' };
  if (!redisConfigured()) return initial;

  const saved = await redis('GET', documentKey);
  if (saved === null) return initial;
  if (typeof saved !== 'string') throw new Error('Invalid résumé record');

  const document = JSON.parse(saved);
  if (typeof document?.text !== 'string' || typeof document?.revision !== 'string') {
    throw new Error('Invalid résumé record');
  }
  return { text: document.text, revision: document.revision };
}

const publishScript = `
if redis.call('GET', KEYS[1]) ~= 'active' then return -1 end
local current = redis.call('GET', KEYS[2])
local revision = current and cjson.decode(current).revision or 'initial'
if revision ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[2], ARGV[2])
return 1
`;

export async function publishResume(text: string, expectedRevision: string, sessionKey: string) {
  const revision = randomUUID();
  const result = await redis('EVAL', publishScript, 2, sessionKey, documentKey, expectedRevision, JSON.stringify({ text, revision }));
  if (result === 1) return { status: 'published', revision } as const;
  if (result === 0) return { status: 'conflict' } as const;
  if (result === -1) return { status: 'expired' } as const;
  throw new Error('Unexpected résumé storage result');
}
