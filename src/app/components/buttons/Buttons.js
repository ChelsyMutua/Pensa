"use client";

import { useState } from 'react';
import styles from './Buttons.module.css';

const feelings = ["Angry", "Sad", "Tired", "Neutral", "Funny", "Inspired", "Happy"];

const getRandomClass = () => {
    const classes = [styles.selected1, styles.selected2, styles.selected3, styles.selected4];
    return classes[Math.floor(Math.random() * classes.length)];
};

export default function Buttons() {
    const [selected, setSelected] = useState({});

    const toggleButton = (feeling) => {
        if (selected[feeling]) {
            const newSelected = { ...selected };
            delete newSelected[feeling];
            setSelected(newSelected);
        } else {
            setSelected({ ...selected, [feeling]: getRandomClass() });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>How are you feeling today?</div>
            <div className={styles.buttons}>
                {feelings.map(feeling => (
                    <button
                        key={feeling}
                        className={`${styles.button} ${selected[feeling] || ''}`}
                        onClick={() => toggleButton(feeling)}
                    >
                        {feeling}
                    </button>
                ))}
            </div>
            {Object.keys(selected).length >= 2 && (
                <button className={styles.continueButton}>
                <span className={styles.mainText}>Continue →</span>
                <span className={styles.subText}>
                  <span className={styles.iconClock}>🕒</span> 5-10 minutes 
                </span>
              </button>
            )}
            <button className={styles.diaryButton}>
                <span className={styles.mainText}>My Diary</span>
                <span className={styles.subText}>
                <span className={styles.iconClock}>🕒</span> 5-10 minutes</span>
                </button>
        </div>
    );
}
