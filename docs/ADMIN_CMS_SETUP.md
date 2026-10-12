# Admin CMS + Supabase setup

This site includes an admin CMS at `/admin` backed by Supabase. Until Supabase is configured, the public website keeps using the built-in static content in `src/data/`.

## 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and create a project.
2. Wait until the database is ready.
3. Open **Project Settings → API**.
4. Copy:
   - **Project URL**
   - **anon public** key

## 2. Add environment variables

In the project root, create `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key
```

Restart the dev server after saving:

```bash
npm run dev
```

## 3. Create database tables + storage policies

1. In Supabase, open **SQL Editor**.
2. Paste and run the full contents of [`supabase/schema.sql`](../supabase/schema.sql).
3. Confirm tables exist under **Table Editor**:
   - `site_settings`
   - `page_sections`
   - `destinations`
   - `packages`
   - `gallery_items`
   - `faqs`
   - `testimonials`
4. Confirm Storage bucket **media** exists (created by the SQL) under **Storage**.

## 4. Create your admin login

1. Open **Authentication → Users**.
2. Click **Add user** → **Create new user**.
3. Enter your email + password.
4. Keep **Auto Confirm User** enabled so you can sign in immediately.

> Anyone who can sign in with Auth can edit CMS content (authenticated write policies). For a single-owner site this is enough. Later you can tighten RLS to a specific allow-list.

## 5. First CMS sync

1. Open [http://localhost:5173/admin/login](http://localhost:5173/admin/login) (port may differ).
2. Sign in with the Auth user you created.
3. On the Dashboard, click **Sync website defaults to Supabase**.
4. This copies the current landing page content into the database.

## 6. Edit content

Use the admin menus:

| Menu | What you edit |
|------|----------------|
| Site settings | Company name, phones, email, Facebook, logo, OG image, DOT details |
| Page sections | Hero / About / Why us / CTA copy + section photos |
| Destinations | Destination cards |
| Packages | Tour packages + rates JSON |
| Gallery | Photos / happy travelers |
| FAQs | Questions and answers |

Image fields accept:

- existing public paths like `/images/hero-palawan.jpg`, or
- uploads to the Supabase `media` bucket (Upload button)

## 7. Verify the public site

1. Open `/` (homepage).
2. Confirm the content source on the admin dashboard shows `supabase` after sync.
3. Edit a hero headline in admin → save → refresh homepage.

## 8. Deploy

### Environment variables on your host

Add the same `VITE_SUPABASE_*` values in:

- Vercel / Netlify / Cloudflare Pages project settings, or
- GitHub Actions secrets if you build via CI

Then rebuild/redeploy.

### Vercel SPA routing

This repo includes `vercel.json` so routes like `/admin/login` serve `index.html` instead of a host 404. Without that rewrite, only `/` works after deploy.

### GitHub Pages note

If you deploy under a subpath (e.g. `/randetravelandtours/`), set Vite `base` accordingly and ensure router basename matches. For a custom domain root, keep `base: '/'`.

### After deploy

Update Open Graph image URLs in `index.html` to absolute URLs if needed, e.g.:

```html
<meta property="og:image" content="https://yourdomain.com/images/og-share.jpg" />
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `/admin/login` shows host 404 (e.g. Vercel “This page doesn’t exist”) | Push `vercel.json` SPA rewrite and redeploy |
| Admin says Supabase is not configured | Missing env vars on the host, or forgot to restart `npm run dev` locally |
| Login fails | Confirm Auth user exists and email is confirmed |
| Save fails with RLS error | Re-run policies in `schema.sql`; confirm you are signed in |
| Upload fails | Confirm `media` bucket exists and storage policies ran |
| Homepage still shows old static text | Run **Sync website defaults**, then edit/save the section again |
| CORS / blocked requests | Use the project anon key (not service role) in the frontend |

## Security notes

- Never put the **service role** key in the frontend.
- The anon key is public by design; RLS protects writes.
- Change your admin password regularly.
- When ready, add a second Auth user for staff instead of sharing one password.

## What this CMS does / does not do yet

**Included now**

- Edit header-to-footer landing content
- Upload images
- Manage packages, destinations, gallery, FAQs
- Auth-protected `/admin`

**Not included yet (future)**

- Inquiry inbox / email automation
- Role-based permissions (viewer vs editor)
- Visual drag-and-drop page builder
