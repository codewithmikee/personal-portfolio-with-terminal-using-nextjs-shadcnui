/**
 *
 * Author: Mikiyas Birhanu
 * Github: @codewithmikee
 */
import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { Toaster } from "@workspace/ui/components/toaster";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mikiyas Birhanu - Full Stack Developer",
  description:
    "Portfolio of a passionate full-stack developer specializing in Laravel and Next.js",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
