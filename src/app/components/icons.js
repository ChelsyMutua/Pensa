"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/router';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined, PlusOutlined, EditOutlined, DeleteOutlined, AudioOutlined, SaveOutlined } from '@ant-design/icons';
import styles from './icons.module.css';

export default function Icons() {
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParams());
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({ title: '', content: '', isNew: true });
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  useEffect(() => {
    // Load entries from JSON file
    fetch('/entries.json')
      .then(response => response.json())
      .then(data => setEntries(data));
  }, []);

  useEffect(() => {
    // Handle route changes
    const id = searchParams.get('id');
    if (id) {
      const entry = entries.find(e => e.id === parseInt(id));
      if (entry) {
        setCurrentEntry({ ...entry, isNew: false });
        setSelectedEntryId(entry.id);
      }
    }
  }, [entries, searchParams]);

  const handleAddEntry = () => {
    setCurrentEntry({ title: '', content: '', isNew: true });
    setSelectedEntryId(null);
    router.push('/diary');
  };

  const handleEntrySelect = (entry) => {
    router.push(`/diary?id=${entry.id}`);
  };

  const handleSave = () => {
    if (currentEntry.isNew) {
      const newEntry = { ...currentEntry, id: Date.now(), isNew: false };
      setEntries([...entries, newEntry]);
      router.push(`/diary?id=${newEntry.id}`);
    } else {
      const updatedEntries = entries.map(entry =>
        entry.id === selectedEntryId ? { ...currentEntry, isNew: false } : entry
      );
      setEntries(updatedEntries);
    }
    // Here you would also save to the JSON file
  };

  const handleDelete = () => {
    const updatedEntries = entries.filter(entry => entry.id !== selectedEntryId);
    setEntries(updatedEntries);
    setCurrentEntry({ title: '', content: '', isNew: true });
    setSelectedEntryId(null);
    router.push('/diary');
    // Here you would also update the JSON file
  };

  return (
    <div>
      
    </div>
  );
}
// onClick={handleSave}
// onClick={handleDelete}
// className={styles.rightColumn}