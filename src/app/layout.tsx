import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata: Metadata = {
  title: "Quiz Forge",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen ">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
