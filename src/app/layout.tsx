"use client";
import { useState, useEffect } from "react";
import Main from "@/components/root";
import styles from "./page.module.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(
      `demo-app web version ${process.env.NEXT_PUBLIC_REACT_APP_VERSION}`
    );
  }, []);

  return (
    <html lang="en">
      <body>
        <main className={styles.main}>
          <Main open={open} setOpen={setOpen}>
            {children}
          </Main>
        </main>
      </body>
    </html>
  );
}
