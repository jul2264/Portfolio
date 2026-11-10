'use server';

import { adminConfig, currentSessionKey, signIn, signOut } from '@/lib/resume-admin';
import { publishResume, resumeTextLimit } from '@/lib/resume-store';

export async function loginAction(_state: string, form: FormData) {
  const password = form.get('password');
  if (typeof password !== 'string') return 'Enter your access key.';
  try {
    return await signIn(password) ? '' : 'Access denied. If you’ve tried several times, wait ten minutes.';
  } catch {
    return 'Sign-in is temporarily unavailable. Try again later.';
  }
}

export async function logoutAction() {
  await signOut();
}

export async function publishAction(
  _state: { message: string; revision?: string },
  form: FormData,
) {
  const sessionKey = await currentSessionKey();
  if (!adminConfig() || !sessionKey) return { message: 'Your session has expired. Sign in again.' };

  const text = form.get('text');
  const revision = form.get('revision');
  if (typeof revision !== 'string' || !/^(initial|[a-f0-9-]{36})$/.test(revision)) {
    return { message: 'Reload the editor before publishing.' };
  }
  if (typeof text !== 'string' || !text.trim() || text.length > resumeTextLimit) {
    return { message: `Enter between 1 and ${resumeTextLimit.toLocaleString('en-US')} characters.`, revision };
  }

  try {
    const result = await publishResume(text.trim(), revision, sessionKey);
    switch (result.status) {
      case 'published':
        return { message: 'Published. The online résumé is live.', revision: result.revision };
      case 'conflict':
        return { message: 'Another edit was published. Copy your text, then reload to see the latest version.', revision };
      case 'expired':
        return { message: 'Your session has expired. Copy your text, then sign in again.' };
    }
  } catch {
    return { message: 'Could not confirm publication. Keep your text and check the online résumé before trying again.', revision };
  }
}
