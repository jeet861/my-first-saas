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
  title: "SnapTrader AI - Trade like a pro",
  description: "AI-powered chart analysis that delivers actionable trade plans.",
};

import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkKey) {
    return (
      <html lang="en">
        <body style={{
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <h1 style={{ color: '#6200ea' }}>Config Required</h1>
            <p>You need to add your Clerk API keys to <code>.env.local</code> to continue.</p>
            <pre style={{
              backgroundColor: '#f1f1f1',
              padding: '1rem',
              borderRadius: '6px',
              textAlign: 'left',
              fontSize: '0.9rem'
            }}>
              NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
              CLERK_SECRET_KEY=sk_test_...
            </pre>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>Get your keys at <a href="https://clerk.com" target="_blank">clerk.com</a></p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
