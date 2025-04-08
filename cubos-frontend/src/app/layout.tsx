"use client"

import "./globals.css";

import Script from "next/script";

import { AppContext, AppElements, AppTheme, ThemeContext } from "@/context/contexts"
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ appElements, setAppElements ] = useState<AppElements>({});
  const [ appTheme, setAppTheme ] = useState<AppTheme>('light');

  useEffect(() => {
    setAppElements({
      scramble: "R2 F D2 U2 B L2 B' L2 B U2 B2 R2 L U R' B' D' R2 F U2 R", 
      scramblebar_text: "R2 F D2 U2 B L2 B' L2 B U2 B2 R2 L U R' B' D' R2 F U2 R"})
  }, [])

  return (
    <html lang="en">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js"></Script>
      </head>
      <body>
        <ThemeContext.Provider value={{ appTheme, setAppTheme }}>
          <AppContext.Provider value={{ appElements, setAppElements }}>
            {children}
          </AppContext.Provider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
