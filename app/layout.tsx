import type { Metadata } from "next";
import { Phudu, Onest } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const phudu = Phudu({
  variable: "--font-display",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sonik — The ecosystem for live events",
  description:
    "Discover events, buy tickets, manage your organization, and scan attendees in — all in one connected platform.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${phudu.variable} ${onest.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
