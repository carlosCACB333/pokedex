import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { darkTheme, lightTheme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <ThemeProvider
        defaultTheme="system"
        attribute="class"
        value={{ light: lightTheme, dark: darkTheme }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default MyApp;
