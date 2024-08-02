"use client";
import { Menu } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './sidebar.module.css';

const items = [
  { label: 'Angry', key: 'angry' },
  { label: 'Sad', key: 'sad' },
  { label: 'Tired', key: 'tired' },
  { label: 'Neutral', key: 'neutral' },
  { label: 'Funny', key: 'funny' },
  { label: 'Inspired', key: 'inspired' },
  { label: 'Happy', key: 'happy' },
  { label: 'Voice Recordings', key: 'voice-recordings' },
  { label: 'My Diary', key: 'my-diary' }
];

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Folders</h2>
      <Menu
        className={styles.menu}
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        items={items.map(item => ({
          key: item.key,
          icon: <FolderOutlined />,
          label: <Link href={`/${item.key}`}>{item.label}</Link>
        }))}
      />
    </div>
  );
}