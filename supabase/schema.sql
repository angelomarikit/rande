-- Rande Travel and Tours — CMS schema
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

-- Site-wide settings (single row, id = 1)
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Editable page sections (hero, about, etc.)
create table if not exists public.page_sections (
  key text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.destinations (
  id text primary key,
  data jsonb not null,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.packages (
  id text primary key,
  data jsonb not null,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id text primary key,
  data jsonb not null,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id text primary key,
  data jsonb not null,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id text primary key,
  data jsonb not null,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- Updated-at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_settings_updated on public.site_settings;
create trigger trg_site_settings_updated
  before update on public.site_settings
  for each row execute function public.set_updated_at();

drop trigger if exists trg_page_sections_updated on public.page_sections;
create trigger trg_page_sections_updated
  before update on public.page_sections
  for each row execute function public.set_updated_at();

-- RLS
alter table public.site_settings enable row level security;
alter table public.page_sections enable row level security;
alter table public.destinations enable row level security;
alter table public.packages enable row level security;
alter table public.gallery_items enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;

-- Public read
drop policy if exists "Public read site_settings" on public.site_settings;
drop policy if exists "Public read page_sections" on public.page_sections;
drop policy if exists "Public read destinations" on public.destinations;
drop policy if exists "Public read packages" on public.packages;
drop policy if exists "Public read gallery_items" on public.gallery_items;
drop policy if exists "Public read faqs" on public.faqs;
drop policy if exists "Public read testimonials" on public.testimonials;

create policy "Public read site_settings" on public.site_settings for select using (true);
create policy "Public read page_sections" on public.page_sections for select using (true);
create policy "Public read destinations" on public.destinations for select using (true);
create policy "Public read packages" on public.packages for select using (true);
create policy "Public read gallery_items" on public.gallery_items for select using (true);
create policy "Public read faqs" on public.faqs for select using (true);
create policy "Public read testimonials" on public.testimonials for select using (true);

-- Authenticated write (admin users)
drop policy if exists "Auth write site_settings" on public.site_settings;
drop policy if exists "Auth write page_sections" on public.page_sections;
drop policy if exists "Auth write destinations" on public.destinations;
drop policy if exists "Auth write packages" on public.packages;
drop policy if exists "Auth write gallery_items" on public.gallery_items;
drop policy if exists "Auth write faqs" on public.faqs;
drop policy if exists "Auth write testimonials" on public.testimonials;

create policy "Auth write site_settings" on public.site_settings
  for all to authenticated using (true) with check (true);
create policy "Auth write page_sections" on public.page_sections
  for all to authenticated using (true) with check (true);
create policy "Auth write destinations" on public.destinations
  for all to authenticated using (true) with check (true);
create policy "Auth write packages" on public.packages
  for all to authenticated using (true) with check (true);
create policy "Auth write gallery_items" on public.gallery_items
  for all to authenticated using (true) with check (true);
create policy "Auth write faqs" on public.faqs
  for all to authenticated using (true) with check (true);
create policy "Auth write testimonials" on public.testimonials
  for all to authenticated using (true) with check (true);

-- Storage bucket for CMS media (run after creating bucket "media" in Dashboard → Storage)
-- Or create via SQL:
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media" on storage.objects;
drop policy if exists "Auth upload media" on storage.objects;
drop policy if exists "Auth update media" on storage.objects;
drop policy if exists "Auth delete media" on storage.objects;

create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Auth upload media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media');

create policy "Auth update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media');

create policy "Auth delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');
