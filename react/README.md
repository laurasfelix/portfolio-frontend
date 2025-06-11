# Portfolio Website (Next.js Version)

This is the Next.js version of Laura Felix's portfolio website, converted from React Native.

## Features

- Interactive PlayStation-style interface with clock, icons, and animations
- Furbotron 3000 chatbot with OpenAI integration
- Responsive design for all screen sizes

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Pages

- **Home** (`/`) - Main portfolio landing page
- **PlayStation Interface** (`/playstation`) - Interactive PlayStation-inspired interface
- **Furbotron** (`/furby`) - Interactive Furby chatbot using OpenAI API

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
