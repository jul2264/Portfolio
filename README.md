This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Online résumé editor

The public résumé is at `/resume`. It starts with the portfolio’s résumé content and reads published edits from Upstash Redis on each request. The original PDF is available separately.

1. Connect an Upstash Redis database to your production Vercel project and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` if the integration does not populate them. Use a separate database for previews.
2. Run this locally to generate a private URL and a random access key. Save the URL and access key in your password manager.

   ```sh
   node -e "const c=require('node:crypto');const key=c.randomBytes(32).toString('base64url');console.log('RESUME_ADMIN_SLUG='+c.randomBytes(18).toString('hex'));console.log('RESUME_ADMIN_PASSWORD_SHA256='+c.createHash('sha256').update(key).digest('hex'));console.log('Access key (keep private): '+key)"
   ```

3. Add `RESUME_ADMIN_SLUG` and `RESUME_ADMIN_PASSWORD_SHA256` to the production environment in Vercel and deploy. The editor is at `/studio/<RESUME_ADMIN_SLUG>`. Enter your access key, type or paste your résumé, and select **Publish résumé**. Further résumé edits take effect without redeploying.
4. For local development, set the same four variables in `.env.local` using a separate Redis database, then run `npm run dev`. The studio returns 404 until configured. Changing the access key hash invalidates existing sessions.

The editor publishes text to the online résumé. The portfolio homepage and bundled PDF have their own source content.
