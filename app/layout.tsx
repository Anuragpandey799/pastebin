import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PestBinn - Pastebin Lite",
  description: "Create and share text pastes instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="w-full bg-indigo-600 text-white shadow-md py-4 px-6">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight">PestBinn</h1>
              <p className="text-sm opacity-80">Share your pastes quickly</p>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl w-full mx-auto p-6">{children}</main>

          {/* Footer */}
          <footer className="w-full bg-gray-100 text-gray-700 py-6 mt-auto text-center text-sm">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
              <p>
                Designed & developed by{" "}
                <a
                  href="https://my-portfolio-wheat-zeta-89.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Anurag Pandey(Portfolio)
                </a>
              </p>
              <p>
                Contact:{" "}
                <a
                  href="mailto:anurag.application799@gmail.com"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  anurag.application799@gmail.com
                </a>{" "}
                | Phone: <span className="font-medium">+91-7991845638</span>
              </p>
            </div>
            
          </footer>
        </div>
      </body>
    </html>
  );
}
