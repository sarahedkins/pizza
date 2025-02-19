
<h1 align="center">The Pizza Shop Inventory Management App</h1>
  Built with boilerplate from Next.js and Supabase Starter Kit
<br/>

## The Stack
  - Typescript
  - React & JSX
  - Next.js
  - Supabase Postgres database
  - Deployable on Vercel

## Notes
The Next.js and Supabase Starter Kit included built-in authentication flow, which requires signing in with an email address and confirming via the email. I've configured the database table policies to allow only authenticated users to interact with the tables. 

## To use the application
- Signup with an email address and password
- Verify the email address when you recieve a confirmation email
- Log in to the app to view the toppings and pizza management pages

## To run locally with your own Supabase instance
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