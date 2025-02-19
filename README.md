
<h1 align="center">My Pizza Shop Inventory App</h1>

  Built with boilerplate from:
  <a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <div>Next.js and Supabase Starter Kit</div>
  </a>

<br/>

## The Stack
  - Typescript
  - React & JSX
  - Next.js
  - Supabase Postgres database
  - Deployable on Vercel


## Notes
The Next.js and Supabase Starter Kit included built-in authentication flow, which requires signing in with an email address and confirming via the email. I've configured the database table policies to allow only authenticated users from interacting with the tables. 


## To run locally
- `npm install`
- Update `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```
      Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

- You can now run the Next.js local development server:
   ```bash
   npm run dev
   ```
   It will be running on [localhost:3000](http://localhost:3000/).