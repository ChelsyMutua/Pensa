// src/app/Layout.js
"use client";
import Sidebar from './components/Sidebar';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
