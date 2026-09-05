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
   - In your new Vercel project, open the **Storage** tab → **Browse
     Storage**.
   - Choose **Upstash** (a free serverless Redis provider), pick the
     **Redis** option, and connect it to this project.
   - When it asks for a **Custom Environment Variable Prefix**, type
     `KV` — this matters, it's what makes the app find it
     automatically as `KV_REST_API_URL` / `KV_REST_API_TOKEN`.
3. **Add photo storage** so you can upload images from the admin
   dashboard instead of only pasting links:
   - Still in **Storage** → **Browse Storage**, choose **Blob** and
     connect it to this project. This adds a `BLOB_READ_WRITE_TOKEN`
     variable automatically — no custom prefix needed for this one.
4. **Set your admin password**:
   - In your Vercel project, go to **Settings → Environment
     Variables**.
   - Add a variable named `ADMIN_PASSWORD` with a password only you
     know.
5. Click **Deploy** (or **Redeploy** if it already deployed before you
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
- For photos, click the file picker next to any Photo field and choose
  an image straight from your computer or phone — it uploads
  automatically and fills in the link for you (this needs the Blob
  storage step above to be set up).

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
