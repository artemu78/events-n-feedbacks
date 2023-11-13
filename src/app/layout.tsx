"use client";
import "./globals.css";

import { useEffect } from "react";
import { Provider } from "react-redux";

import MainClient from "@/components/root/mainclient";
import store from "@/store";

import styles from "./page.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <MainClient>{children}</MainClient>
          </Provider>
        </main>
      </body>
    </html>
  );
}
