"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FloatButton, Modal, Button } from 'antd';
import { CustomerServiceOutlined, AudioOutlined, SaveOutlined } from '@ant-design/icons';
import styles from './MainContent.module.css';

export default function MainContent() {
  const [content, setContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalRef = useRef(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    if (isRecording) {
      stopRecording();
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    intervalRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);

    mediaRecorder.onstop = async () => {
      clearInterval(intervalRef.current);
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioBuffer = await audioBlob.arrayBuffer();
      const audioData = new Uint8Array(audioBuffer);

      // Save the audio data to the server
      const fileName = `recording_${Date.now()}.wav`;
      const response = await fetch('/api/voice-recordings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ audioData: Array.from(audioData), fileName })
      });

      if (response.ok) {
        alert('Recording saved successfully!');
      } else {
        alert('Failed to save recording.');
      }

      audioChunksRef.current = [];
      setIsRecording(false);
      setIsModalVisible(false);
    };
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={styles.mainContent}>
      <textarea
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textArea}
      />
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24, bottom: 24 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton icon={<AudioOutlined />} tooltip="Voice Note" onClick={showModal} />
        <FloatButton icon={<SaveOutlined />} tooltip="Save" />
      </FloatButton.Group>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ padding: '20px', textAlign: 'center' }}
        width={isRecording ? 300 : 400}
      >
        {isRecording ? (
          <div className={styles.compactModalContent}>
            <div className={styles.recordingIndicator}></div>
            <span className={styles.recordingTime}>{formatTime(recordingTime)}</span>
            <Button onClick={stopRecording} className={styles.stopButton}>
              Stop Recording
            </Button>
          </div>
        ) : (
          <div className={styles.modalContent}>
            <img src="/voice-note.png" alt="Voice Note Icon" className={styles.microphoneIcon} />
            <Button onClick={startRecording} className={styles.startButton}>
              Start Recording
            </Button>
            <Button onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}