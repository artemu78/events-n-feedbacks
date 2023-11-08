"use client";
import "./globals.css";

import { useEffect,useState } from "react";

import Main from "@/components/root";

import styles from "./page.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
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
