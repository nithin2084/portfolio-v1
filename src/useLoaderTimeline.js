import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLoaderTimeline
 * 
 * Manages sequential word animation timeline
 * Controls when each word appears and exits
 * 
 * Timeline structure:
 * - Each word displays for ~800ms
 * - Exit animation: ~500ms
 * - Small gap between words: ~100ms
 * - Final word stays longer: ~1200ms
 */

const useLoaderTimeline = () => {
  // Word sequence configuration
  const words = [
    { 
      text: 'IDEAS', 
      filledIndices: [0, 2, 3], // I, E, A filled; D, S outlined
      duration: 600 // Faster than before
    },
    { 
      text: 'TAKING', 
      filledIndices: [0, 2, 4, 5], // T, K, N, G filled; A, I outlined
      duration: 600 // Faster than before
    },
    { 
      text: 'SHAPE', 
      filledIndices: [0, 2, 3], // S, A, P filled; H, E outlined
      duration: 650 // Slightly longer for readability
    },
    { 
      text: 'NITHIN', 
      filledIndices: [0, 2, 3, 5], // N, T, H, N filled; I, I outlined
      duration: 1000, // Longer emphasis for final word
      isFinal: true 
    },
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldZoom, setShouldZoom] = useState(false);
  const [shouldSplit, setShouldSplit] = useState(false);

  useEffect(() => {
    if (currentWordIndex >= words.length) {
      // All words shown, trigger zoom on final word IMMEDIATELY
      const zoomTimer = setTimeout(() => {
        setShouldZoom(true);
        
        // Trigger split DURING zoom (before it completes) for cinematic cut
        const splitTimer = setTimeout(() => {
          setShouldSplit(true);
          
          // After split animation, mark as complete
          const completeTimer = setTimeout(() => {
            setIsComplete(true);
          }, 1000); // Wait for split animation

          return () => clearTimeout(completeTimer);
        }, 700); // Start split at ~90% of zoom duration (was 1500)

        return () => clearTimeout(splitTimer);
      }, 200); // Minimal delay before zoom starts (was 300)

      return () => clearTimeout(zoomTimer);
    }

    const currentWord = words[currentWordIndex];

    // Show word for its duration, then move to next
    const wordTimer = setTimeout(() => {
      setCurrentWordIndex(currentWordIndex + 1);
    }, currentWord.duration);

    return () => clearTimeout(wordTimer);
  }, [currentWordIndex]);

  return {
    currentWord: words[currentWordIndex],
    isComplete,
    shouldZoom,
    shouldSplit,
    progress: ((currentWordIndex + 1) / words.length) * 100,
  };
};

export default useLoaderTimeline;
