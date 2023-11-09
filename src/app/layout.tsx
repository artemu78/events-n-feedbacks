"use client";
import "./globals.css";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import Main from "@/components/root";
import store from "@/store";

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
          <Provider store={store}>
            <Main open={open} setOpen={setOpen}>
              {children}
            </Main>
          </Provider>
        </main>
      </body>
    </html>
  );
}
