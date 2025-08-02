import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "News Aggregator",
  description: "Stay informed with the latest news from multiple sources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remove browser extension elements that cause hydration issues
                function removeBrowserExtensions() {
                  const selectors = [
                    '[id*="ultimate-toolbar"]',
                    '[class*="ultimate-toolbar"]',
                    '[id*="gpt"]',
                    '[class*="gpt"]',
                    '[id*="chrome-extension"]',
                    '[class*="chrome-extension"]',
                    '[id*="browser-extension"]',
                    '[class*="browser-extension"]',
                    '[id*="ultimate-toolbar-gpt"]',
                    '[class*="ultimate-toolbar-gpt"]'
                  ];
                  
                  selectors.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                      console.log('Removing browser extension element:', el);
                      el.remove();
                    });
                  });
                }
                
                // Run immediately
                removeBrowserExtensions();
                
                // Run on DOM content loaded
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removeBrowserExtensions);
                }
                
                // Run on window load
                window.addEventListener('load', removeBrowserExtensions);
                
                // Run periodically for dynamic content
                setInterval(removeBrowserExtensions, 1000);
                
                // Override console.warn to suppress hydration warnings
                const originalWarn = console.warn;
                console.warn = function(...args) {
                  if (args[0] && typeof args[0] === 'string' && args[0].includes('Hydration')) {
                    return; // Suppress hydration warnings
                  }
                  originalWarn.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
