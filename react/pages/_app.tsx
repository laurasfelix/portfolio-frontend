import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from 'next/font/local';
 
const SFPro = localFont({
  src: '../public/fonts/SF-Pro-Rounded-Regular.otf',
  weight: "200", 
})
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${SFPro.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
