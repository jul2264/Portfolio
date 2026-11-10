'use client';

import { useActionState, useState } from 'react';
import { loginAction, publishAction } from './actions';

export function LoginForm() {
  const [message, action, pending] = useActionState(loginAction, '');

  return (
    <form className="contact-form resume-login" action={action}>
      <label>
        Access key
        <input name="password" type="password" autoComplete="current-password" required maxLength={256} />
      </label>
      <button className="outline-action" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
      <p role="status">{message}</p>
    </form>
  );
}

export function ResumeEditor({ text, revision, limit }: { text: string; revision: string; limit: number }) {
  const [value, setValue] = useState(text);
  const [state, action, pending] = useActionState(publishAction, { message: '', revision });

  return (
    <form className="contact-form resume-editor" action={action}>
      <input type="hidden" name="revision" value={state.revision ?? revision} />
      <label htmlFor="resume-text">Résumé text</label>
      <p id="resume-format">Start a section heading with <code>## </code>. Use blank lines between paragraphs.</p>
      <textarea
        id="resume-text"
        name="text"
        rows={21}
        required
        maxLength={limit}
        aria-describedby="resume-format"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="outline-action" type="submit" disabled={pending}>{pending ? 'Publishing…' : 'Publish résumé'}</button>
      <p role="status">{state.message}</p>
    </form>
  );
}
