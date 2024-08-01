// pages/index.js
"use client";
import Head from 'next/head';
import Buttons from './components/buttons/Buttons';
import styles from './page.module.css';



export default function Home() {
    return (
        <div className={styles.pageContainer}>
            <Head>
                <title>Emotion Tracker</title>
                <meta name="description" content="Track your feelings" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.mainContent}>
               
                <Buttons />
            </main>
        </div>
    );
}
