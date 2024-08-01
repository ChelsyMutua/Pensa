"use client";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ButtonsWithBackground from './components/buttons/ButtonsWithBackground';
import SplashScreen from './components/SplashScreen';
import MainContent from './components/MainContent';
import RootLayout from './layout';
import styles from './page.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLayout, setShowLayout] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [prompts, setPrompts] = useState([]);
  const searchParams = useSearchParams();
  const fileName = searchParams.get('file');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    const fetchPrompts = async () => {
      const feeling = searchParams.get('emotion');
      if (feeling) {
        setSelectedFeeling(feeling);
        const response = await fetch('/prompts.json');
        const data = await response.json();
        setPrompts(data[feeling]);
        setShowLayout(true);
        setShowSidebar(true);
      }
    };

    fetchPrompts();
  }, [searchParams]);

  const handleDiaryClick = () => {
    setShowLayout(true);
    setShowSidebar(true);
  };

  if (showLayout) {
    return (
      <RootLayout showSidebar={showSidebar}>
        <MainContent selectedFeeling={selectedFeeling} prompts={prompts} fileName={fileName} />
      </RootLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Emotion Tracker</title>
        <meta name="description" content="Track your feelings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          {isLoading ? <SplashScreen /> : <ButtonsWithBackground onDiaryClick={handleDiaryClick} />}
        </main>
      </div>
    </>
  );
}
