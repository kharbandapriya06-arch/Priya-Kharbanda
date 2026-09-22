# Designer portfolio

A Next.js portfolio for a product and brand designer. Sample work, an about page, and a contact form are in place so you can replace copy and images with your own.

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Personalize

1. Edit `src/lib/site.ts` — name, role, email, social links, and bio.
2. Edit `src/lib/projects.ts` — case studies. Swap the geometric covers for photos later by changing `ProjectCover`.
3. Update the heading copy on `src/app/page.tsx` and `src/app/about/page.tsx`.

## Web3Forms (contact form)

The contact page posts to [Web3Forms](https://web3forms.com) from the browser. No server route is required on the free plan.

1. Create an access key at [web3forms.com](https://web3forms.com) and verify your email.
2. Copy `.env.example` to `.env.local` if it is not already there.
3. Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` to your key.
4. Restart `npm run dev`.

Until the key is set, the form explains what is missing instead of failing silently.

## Deploy on Vercel

This app is ready for Vercel with no extra config.

1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add environment variables:
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production URL, e.g. `https://your-domain.vercel.app`)
4. Deploy.

After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the live domain and redeploy so sitemap and Open Graph URLs are correct.
