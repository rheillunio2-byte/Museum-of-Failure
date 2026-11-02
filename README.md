# Museum of Failure
An editorial digital archive for experiments that didn't work and the lessons they left behind.

## Run locally
Open `index.html` in a browser, or use VS Code Live Server. No build step is required.

## Included
- Responsive editorial museum layout, no permanent sidebar, with a minimal mobile menu
- Collection filters, sorting, exhibit record dialogs, keyboard-friendly search
- Calm, purposeful motion that respects `prefers-reduced-motion`
- Curated exhibition previews and field notes
- Submission form saved to browser `localStorage`

## Prototype limitation
Submissions are stored only in the visitor's browser and are not publicly shared. A production archive needs backend storage, authentication, moderation, spam protection, and curator tools.

## Suggested production stack
React + TypeScript + Vite, Supabase (Postgres/Auth/Storage/RLS), and Vercel.
