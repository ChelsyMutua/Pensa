"use client";
import { useState, useEffect } from 'react';
import styles from './MainContent.module.css';

export default function MainContent({ selectedFeeling, prompts, fileName = '' }) {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(prompts.length).fill(''));

  useEffect(() => {
    if (fileName) {
      // Fetch existing answers from the file if editing
      fetch(`/emotions/${selectedFeeling.toLowerCase()}/${fileName}`)
        .then(response => response.json())
        .then(data => setAnswers(data.answers))
        .catch(error => console.error('Error fetching answers:', error));
    }
  }, [fileName, selectedFeeling]);

  const handleNextPrompt = () => {
    if (currentPromptIndex < prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    }
  };

  const handlePreviousPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
    }
  };

  const handleSave = async () => {
    const data = { feeling: selectedFeeling, answers };
    console.log('Saving data:', data);

    try {
      const response = await fetch('/api/saveData', {
        method: fileName ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, fileName }),
      });

      if (!response.ok) {
        console.error(`Failed to save data: ${response.statusText}`);
        return;
      }

      const result = await response.json();
      console.log(`Save response: ${result.message}`);
      alert('Your answers have been saved!');
    } catch (error) {
      console.error(`Error saving data: ${error}`);
    }
  };

  const handleAnswerChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentPromptIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.promptContainer}>
        <h2>{selectedFeeling} Journal</h2>
        <h3>{prompts[currentPromptIndex]}</h3>
        <textarea
          placeholder="Start typing..."
          className={styles.textArea}
          value={answers[currentPromptIndex]}
          onChange={handleAnswerChange}
        ></textarea>
        <div className={styles.buttonContainer}>
          {currentPromptIndex > 0 && (
            <button className={styles.prevButton} onClick={handlePreviousPrompt}>
              ← Previous Question
            </button>
          )}
          {currentPromptIndex < prompts.length - 1 ? (
            <button className={styles.nextButton} onClick={handleNextPrompt}>
              Next Question →
            </button>
          ) : (
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
