// src/hooks/useKeydownSound.js
import { useEffect } from 'react';

const useKeydownSound = (audioFile) => {
  useEffect(() => {
    const audio = new Audio(audioFile);

    const playSound = () => {
      audio.currentTime = 0;
      audio.play();
    };

    window.addEventListener('keydown', playSound);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', playSound);
    };
  }, [audioFile]);
};

export default useKeydownSound;
