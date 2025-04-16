# ગુજરાત રિન્યુએબલ્સ - Gujarat Renewables

A solar land aggregation website targeting Gujarati farmers and landowners.

## Features

- Land submission form in Gujarati language
- Information about benefits of solar projects
- Firebase integration for data storage
- Mobile-responsive design

## Getting Started

First, set up your Firebase project:

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Set up Firestore database
3. Copy your Firebase configuration details
4. Create a `.env.local` file based on `.env.local.example` with your Firebase credentials

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Make sure to configure your environment variables in your production environment.

## Technology Stack

- Next.js 15
- React 19
- TailwindCSS
- Firebase/Firestore
- Gujarati language support with Google Fonts
