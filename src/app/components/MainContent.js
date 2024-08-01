// src/app/components/MainContent.js
"use client";
import styles from './MainContent.module.css';

export default function MainContent() {
  return (
    <div className={styles.mainContent}>
      <textarea placeholder="Start writing..." className={styles.textArea}></textarea>
    </div>
  );
}
