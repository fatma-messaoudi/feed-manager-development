'use client'; // Add this directive if the component is a client component

import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { FeedProvider } from '../context/FeedContext';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <ClerkProvider
    
      appearance={{
        variables: { colorPrimary: "#FACC15" },
      }} localization={frFR}>
      <html lang="fr">
        <body className={inter.className}>
          <FeedProvider>
            {children}
          </FeedProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
