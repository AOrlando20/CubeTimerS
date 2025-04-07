"use client"

import "./globals.css";

import { AppContext, AppElements, AppTheme, ThemeContext } from "@/app/context/contexts"
import Script from "next/script";
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
