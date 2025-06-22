import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APIのハンズオン",
  description: "API関連の学習のためのハンズオンです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
