import type { Metadata } from "next";
import "./globals.css";
import ConfigNotice from "@/components/ConfigNotice";

export const metadata: Metadata = {
  title: "Flashcard Frenzy Multiplayer - Real-time Competitive Learning",
  description: "Challenge friends in real-time flashcard battles. Race to answer questions, climb leaderboards, and become the ultimate knowledge champion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ConfigNotice />
        {children}
      </body>
    </html>
  );
}
