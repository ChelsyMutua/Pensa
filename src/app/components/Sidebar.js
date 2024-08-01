// src/app/components/Sidebar.js
"use client";
import styles from './sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Folders</h2>
      <ul>
        <li>Angry</li>
        <li>Sad</li>
        <li>Tired</li>
        <li>Neutral</li>
        <li>Funny</li>
        <li>Inspired</li>
        <li>Happy</li>
        <li>Voice Recordings</li>
        <li>My Diary</li>
      </ul>
    </div>
  );
}
