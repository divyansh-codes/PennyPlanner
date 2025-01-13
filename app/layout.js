// This page is the root layout for your application. It wraps around every page and component.
// This page also contains details about the fonts used in the application.
// The clerk Authentication provider is also initialized here.

import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

// The fonts used in the application are defined here
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// The metadata for the application is defined here
export const metadata = {
  title: "Penny Planner",
  description: "A simple budgeting and expense tracking app",
};

export default function RootLayout({ children }) {
  return (

    // ClerkProvider is the authentication provider for the application
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Penny Planner</title>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
