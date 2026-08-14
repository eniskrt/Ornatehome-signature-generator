import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email Signature Generator | Ornate Home",
  description: "Create a standardized Ornate Home email signature.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
