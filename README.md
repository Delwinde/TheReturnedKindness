# The Returned Kindness

A website for The Returned Kindness, with a password-protected admin
dashboard for updating Stories, Events, and Founders yourself — no
code required after setup.

## What's included

- **Public site**: Home, About, Stories, Events, Founders, Contact
- **Admin dashboard** at `/admin` (password protected) to add, edit, and
  delete stories, events, and founder profiles, and to read messages
  sent through the Contact form
- Built with Next.js, deployable to Vercel for free

## 1. One-time setup on Vercel

1. **Push this folder to GitHub** (create a new repository and push these
   files), then go to [vercel.com](https://vercel.com), click **Add New
   → Project**, and import that repository.
2. **Add a database** so your content is saved permanently:
   - In your new Vercel project, open the **Storage** tab.
   - Click **Create Database → KV** (this is a free tier by Upstash).
   - Follow the prompts to create it and connect it to your project.
     Vercel will automatically add the `KV_REST_API_URL` and
     `KV_REST_API_TOKEN` environment variables for you — you don't
     need to type these in yourself.
3. **Set your admin password**:
   - In your Vercel project, go to **Settings → Environment
     Variables**.
   - Add a variable named `ADMIN_PASSWORD` with a password only you
     know.
4. Click **Deploy** (or **Redeploy** if it already deployed before you
   added the database/password). Your site will be live at a
   `your-project.vercel.app` address, which you can later swap for a
   custom domain in **Settings → Domains**.

## 2. Using the admin dashboard

- Go to `yoursite.vercel.app/admin` and sign in with the
  `ADMIN_PASSWORD` you set above.
- Use the tabs to add or edit **Stories**, **Events**, and
  **Founders**. Changes appear on the live site immediately.
- The **Messages** tab shows anything submitted through the Contact
  page, with a link to reply by email.
- For photos, paste a link to an image that's already hosted online
  (for example, upload it to your phone's cloud photos, Imgur, or your
  Google Drive with public link sharing, then paste that link into the
  Image URL field). This keeps the site simple and free to run —
  it doesn't include its own file/image uploader.

## 3. Running it on your own computer (optional)

Only needed if you want to preview changes before deploying, or plan to
customize the code further.

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Without a KV database connected
locally, content you add will reset each time you restart the server
(the live Vercel site will still save everything correctly once KV is
connected there).

## Project structure

- `app/` — every page and API route (Next.js App Router)
- `components/` — the navbar, footer, and the admin dashboard's
  reusable form/list UI
- `lib/data.js` — reads and writes Stories/Events/Founders/Messages
- `lib/auth.js` — the admin password check and login session
- `public/logo.png` — your logo, shown in the navbar, footer, and
  homepage
