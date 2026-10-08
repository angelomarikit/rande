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

## Notes before launch

- Confirm Facebook / Instagram / Messenger / Google Maps URLs
- Compress `public/videos/travel-moments.mp4` for production (current file is large)
- Add a Privacy Policy page when legal copy is available
- Rates shown are from client materials and marked as subject to change
