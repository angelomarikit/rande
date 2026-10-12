# Rande Travel and Tours

Premium marketing site for Rande Travel and Tours (established 2012).

## Stack

- React + TypeScript (strict)
- Vite
- Tailwind CSS v4
- Motion for React
- React Hook Form + Zod
- Lucide React

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Admin CMS (Supabase)

Edit landing page content at `/admin` after connecting Supabase.

Full setup guide: [`docs/ADMIN_CMS_SETUP.md`](docs/ADMIN_CMS_SETUP.md)

Quick start:

1. Create a Supabase project
2. Copy `.env.example` → `.env.local` and add URL + anon key
3. Run `supabase/schema.sql` in the Supabase SQL Editor
4. Create an Auth user
5. Open `/admin/login`, sign in, click **Sync website defaults to Supabase**

## Content & configuration

Edit these files to update the site without rebuilding layouts:

- `src/data/site.ts` — company name, phone, email, social URLs
- `src/data/packages.ts` — tour packages, rates, itineraries
- `src/data/destinations.ts` — destination collage
- `src/data/gallery.ts` — gallery photos / verified testimonials
- `src/data/faqs.ts` — FAQ copy
- `public/images/` — photography & logo
- `public/videos/` — about-section video

Leave social URLs empty in `site.ts` until verified — unconfigured channels stay hidden.

## Inquiry delivery

There is no backend yet. The contact form opens WhatsApp / a mailto draft, or copies a formatted inquiry to the clipboard. Hook into `submitInquiryToApi` in `src/lib/inquiry.ts` when Formspree, Resend, Supabase, or a custom API is ready.

## Social share / Open Graph image

Share preview image: `public/images/og-share.jpg`

After the site is live, update `index.html` so `og:image` and `twitter:image` use the **full absolute URL**, for example:

```html
<meta property="og:image" content="https://yourdomain.com/images/og-share.jpg" />
<meta name="twitter:image" content="https://yourdomain.com/images/og-share.jpg" />
```

Then test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and refresh the scrape cache.

## Notes before launch

- Set `siteUrl` in `src/data/site.ts` once the production domain is known
- Compress `public/videos/travel-moments.mp4` for production (current file is large)
- Add a Privacy Policy page when legal copy is available
- Rates shown are from client materials and marked as subject to change
