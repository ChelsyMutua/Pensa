// src/app/components/buttons/ButtonsWithBackground.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ButtonsWithBackground.module.css';

const feelings = ["Angry", "Sad", "Tired", "Neutral", "Funny", "Inspired", "Happy"];

const getRandomClass = () => {
  const classes = [styles.selected1, styles.selected2, styles.selected3, styles.selected4];
  return classes[Math.floor(Math.random() * classes.length)];
};

export default function ButtonsWithBackground({ onDiaryClick }) {
  const [selected, setSelected] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [showPrompts, setShowPrompts] = useState(false);
  const router = useRouter();

  const toggleButton = (feeling) => {
    if (selected === feeling) {
      setSelected(null);
      setSelectedClass(null);
      setShowPrompts(false);
    } else {
      setSelected(feeling);
      setSelectedClass(getRandomClass());
      setShowPrompts(false);
    }
  };

  const handleContinue = async () => {
    if (selected) {
      const response = await fetch('/prompts.json');
      const data = await response.json();
      setPrompts(data[selected]);
      setShowPrompts(true);

      // Navigate to the MainContent page with the selected feeling and prompts
      router.push(`/?emotion=${selected}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>How are you feeling today?</div>
      <div className={styles.buttons}>
        {feelings.map(feeling => (
          <button
            key={feeling}
            className={`${styles.button} ${selected === feeling ? selectedClass : selected ? styles.disabled : ''}`}
            onClick={() => toggleButton(feeling)}
            disabled={!!selected && selected !== feeling}
          >
            {feeling}
          </button>
        ))}
      </div>
      {selected && (
        <button className={styles.continueButton} onClick={handleContinue}>
          <span className={styles.mainText}>Continue →</span>
          <span className={styles.subText}>
            <span className={styles.iconClock}>🕒</span> 5-10 minutes
          </span>
        </button>
      )}
      {/* {showPrompts && (
        <div className={styles.prompts}>
          <h2>Journal Prompts for {selected}</h2>
          <ul>
            {prompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>
      )} */}
      <button className={styles.diaryButton} onClick={onDiaryClick}>
        <span className={styles.mainText}>My Diary</span>
        <span className={styles.subText}>
          <span className={styles.iconClock}>🕒</span> 5-10 minutes
        </span>
      </button>
    </div>
  );
}
