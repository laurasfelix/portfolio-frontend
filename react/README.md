# Portfolio Website (Next.js Version)

This is Laura Felix's portfolio website, built with Next.js (Pages Router).

## Features

- Interactive PlayStation-style interface with clock, icons, and animations
- Furbotron 3000 chatbot (free Groq API for answers, browser speech synthesis for his voice)
- Responsive design for all screen sizes

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add a free Groq API key (create one at https://console.groq.com/keys, no card needed):
     ```
     GROQ_API_KEY=your_groq_api_key_here
     # optional, defaults to openai/gpt-oss-20b
     GROQ_MODEL=openai/gpt-oss-20b
     ```
   - On Vercel, add the same variables under Project Settings → Environment Variables.
     Never prefix the key with `NEXT_PUBLIC_` — that ships it to every visitor's browser.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Pages

- **Home** (`/`) - Main portfolio landing page
- **PlayStation Interface** (`/playstation`) - Interactive PlayStation-inspired interface
- **Furbotron** (`/furby`) - Interactive Furby chatbot (server route at `/api/furbotron`)

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API

## Migration Notes

This project was migrated from a React Native application to Next.js. Key changes include:

1. Replaced React Native components with HTML/JSX equivalents
2. Converted StyleSheet styles to Tailwind CSS classes
3. Updated animation handling
4. Fixed responsive design for web browsers
5. Created API routes for backend functionality

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
