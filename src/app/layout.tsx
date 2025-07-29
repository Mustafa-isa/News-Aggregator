import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News Aggregator - Beyond Creation",
  description: "A modern news aggregator that pulls articles from various sources and displays them in a clean, easy-to-read format.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Handle browser extension interference
              window.addEventListener('load', function() {
                // Remove any browser extension elements that might cause hydration issues
                const extensionElements = document.querySelectorAll('[id*="ultimate-toolbar"], [id*="gpt"], [class*="ul-sticky"]');
                extensionElements.forEach(el => {
                  if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                  }
                });
              });

              // Simple theme initialization - let React handle the rest
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // Fallback to light mode
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
