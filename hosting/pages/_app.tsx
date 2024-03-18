import { initializeApp } from "firebase/app";
import type { AppProps } from "next/app";

initializeApp({
  apiKey: "AIzaSyB2_iMgOsu6zEeKeRpDCYJQSoouU9RHR7E",
  authDomain: "reste-zauber-dev.firebaseapp.com",
  projectId: "reste-zauber-dev",
  storageBucket: "reste-zauber-dev.appspot.com",
  messagingSenderId: "534108749076",
  appId: "1:534108749076:web:db19962033188aaff35601",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
