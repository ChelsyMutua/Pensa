"use client";

import { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import { FolderOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from './sidebar.module.css';

const emotions = [
  { label: 'Angry', key: 'angry', color: '#87CFFA' },
  { label: 'Sad', key: 'sad', color: '#FFA183' },
  { label: 'Tired', key: 'tired', color: '#FFDE83' },
  { label: 'Neutral', key: 'neutral', color: '#FFC783' },
  { label: 'Funny', key: 'funny', color: '#87CFFA' },
  { label: 'Inspired', key: 'inspired', color: '#FFA183' },
  { label: 'Happy', key: 'happy', color: '#FFDE83' },
  { label: 'Voice Recordings', key: 'voice-recordings', color: '#FFC783' },
  { label: 'My Diary', key: 'my-diary', color: '#87CFFA' }
];

export default function Sidebar() {
  const router = useRouter();
  const [fileItems, setFileItems] = useState([]);

  const fetchFiles = async (emotion) => {
    const response = await fetch(`/api/listFiles?emotion=${emotion}`);
    if (!response.ok) {
      console.error('Failed to fetch files:', response.statusText);
      return [];
    }
    const files = await response.json();
    return files.map(file => ({
      key: `${emotion}/${file}`,
      label: file.replace('.json', ''),
      icon: <FolderOutlined style={{ color: emotions.find(e => e.key === emotion).color }} />
    }));
  };

  useEffect(() => {
    const loadFiles = async () => {
      const items = await Promise.all(emotions.map(async emotion => {
        const files = await fetchFiles(emotion.key);
        return {
          key: emotion.key,
          icon: <FolderOutlined style={{ color: emotion.color }} />,
          label: emotion.label,
          children: files
        };
      }));
      setFileItems(items);
    };

    loadFiles();
  }, []);

  const handleMenuClick = (e) => {
    const [emotion, file] = e.key.split('/');
    router.push({
      pathname: '/',
      query: { emotion, file }
    });
  };

  return (
    <div className={styles.sidebar}>
      <Button 
        shape="circle" 
        icon={<PlusOutlined />} 
        className={styles.addButton} 
      />
      <h2>Folders</h2>
      <Menu
        className={styles.menu}
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        items={fileItems}
        onClick={handleMenuClick}
      />
    </div>
  );
}
