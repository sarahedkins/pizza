
<h1 align="center">The Pizza Shop Inventory Management App</h1>
  Built with boilerplate from Next.js and Supabase Starter Kit
<br/>

## The Stack
  - Typescript
  - React & JSX
  - Next.js
  - Supabase Postgres database
  - Deployable on Vercel

## To use the application
- Signup with an email address and password
- Verify the email address when you recieve a confirmation email
- Log in to the app to view the toppings and pizza management pages

## Notes
The Next.js and Supabase Starter Kit included built-in authentication flow, which requires signing in with an email address and confirming via the email. I've configured the database table policies to allow only authenticated users to interact with the tables. 

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

## Tests

I elected not to implement tests for this project. I typically base the decision to write tests on a few factors including the longevity of the application, and the business logic complexity. Since the longevity of this project is low, and I can enforce most of the required business logic in the database constraints itself, I elected not to add tests.

In the real world, on a real application, I am more than happy to write thoughtful tests.

## Ambiguity 

Since this is a take-home assignment with a 3 day time limit, I opted to make reasonable executive decisions when faced with ambiguity. In the real world, I would collaborate with project stakeholders to clarify the requirements to inform the best path forward.

For example, what should happen when a topping that is used in a pizza is deleted? Normally I would run this question by a stakeholder. Here, I opted to allow the topping to be deleted and mark the pizza in the UI so the pizza shop keeper could edit the pizza.  

## If I had more time...
- I would add error handling to the database fetches. I'd use try/catch blocks and a toast notification system to properly display errors. I'd also log errors to an error managmeent platform so the developers can track and handle frequent errors.
- I would make the topping quantities editable. If this were a real shop, you should be able to keep track of inventory and mark certain pizzas as unavailable when the quantity of a topping is too low. 

## Codepointers for Hiring Team reviewers

The interesting parts of the code to look at are:
- app/protected/pizza-inventory/page.tsx
- app/protected/toppings-inventory/page.tsx
- components/pizza/manageForm/manageForm.tsx
- components/pizza/pizzaCard/pizzaCard.tsx
- components/pizza/toppingCard/toppingCard.tsx
- app/protected/page.tsx
