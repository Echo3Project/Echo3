This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# OR
yarn dev
# OR
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy set-up

First of all, you must use firebase-tools command and login your account to setup project in firebase
Either install it locally firebase-tools globally and login your account:

```bash
npm install -g firebase-tools
# Then login your account with firebase-tools globally commands
firebase login
```

Or use dependencies of project :

```bash
npm install
# OR
yarn
# OR
pnpm install
# Then login your account with npx
npx firebase login
```

## Deploy

First, install dependencies and build the application :

```bash
npm install
npm run build
# or
yarn
yarn build
# or
pnpm install
pnpm build
```

Then, install and build functions in folder `./functions` :

```bash
npm install
npm run build
```

Then, run :

```bash
# if you have firebase-tools install globally
firebase deploy
# else use
npx firebase deploy
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
