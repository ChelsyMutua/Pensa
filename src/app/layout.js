// src/app/layout.js
import './globals.css';
import Sidebar from './components/Sidebar';
import styles from './layout.module.css';

export default function RootLayout({ children, showSidebar }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className={styles.container}>
          {/* <header className={styles.header}>
            Emotion Tracker
          </header> */}
          <div className={styles.contentContainer}>
            {showSidebar && <Sidebar />}
            <div className={styles.siteLayoutContent}>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
