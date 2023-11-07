"use client";
import * as React from 'react';
import styles from './page.module.css';
import Main from "@/app/components/root";
export default function Home() {
  const [open, setOpen] = React.useState(false);

  return (
    <main className={styles.main}>
      <Main open={open} setOpen={setOpen} />
    </main>
  )
}
