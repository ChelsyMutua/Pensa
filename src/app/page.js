// src/app/pages/page.js
"use client";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ButtonsWithBackground from './components/buttons/ButtonsWithBackground';
import SplashScreen from './components/SplashScreen';
import styles from './page.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      <Head>
        <title>Emotion Tracker</title>
        <meta name="description" content="Track your feelings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          {isLoading ? <SplashScreen /> : <ButtonsWithBackground />}
        </main>
      </div>
    </>
  );
}
