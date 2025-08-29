import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/context/themeContext"
import UserProvider from "../context/userContext";

export const metadata: Metadata = {
  title: "Resumaker",
  description: "Generate resumes and cover letters easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <UserProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
