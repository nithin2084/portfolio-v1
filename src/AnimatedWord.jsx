import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedWord Component
 * 
 * Handles individual word animation with:
 * - Letter splitting for staggered animation
 * - Diagonal motion (left letters faster than right)
 * - Filled vs outlined letter styling
 * - Masked container clipping
 */

const AnimatedWord = ({ word, isFinal, filledIndices = [], shouldZoom = false }) => {
  // Split word into individual letters for stagger animation
  const letters = word.split('');

  /**
   * Container variants
   * Includes zoom animation for final word after settling
   */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025, // Faster stagger (was 0.03)
      },
    },
    zoom: {
      scale: 2.2, // Dramatic zoom toward viewer - more aggressive
      transition: {
        duration: 0.8, // Faster, more decisive (was 1.4s)
        ease: [0.4, 0, 0.2, 1], // Smooth ease-in-out
        delay: 0.1, // Minimal delay
      },
    },
  };

  /**
   * Letter variants
   * Creates diagonal motion by varying Y offset based on letter index
   * Left letters (index 0) move faster than right letters
   */
  const getLetterVariants = (index, totalLetters) => {
    // Calculate progressive delay: left = less delay, right = more delay
    const progressiveDelay = (index / totalLetters) * 0.12; // Faster (was 0.15)

    return {
      hidden: {
        y: -100,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5, // Faster (was 0.6)
          ease: [0.4, 0, 0.2, 1],
          delay: progressiveDelay,
        },
      },
    };
  };

  return (
    <motion.div
      className={`animated-word ${isFinal ? 'final-word' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate={shouldZoom ? 'zoom' : 'visible'}
      // NO EXIT PROP - words are replaced by AnimatePresence, NITHIN never exits
    >
      {letters.map((letter, index) => {
        // Determine if this letter should be outlined or filled
        const isOutlined = filledIndices.length > 0 && !filledIndices.includes(index);

        return (
          <motion.span
            key={`${word}-${index}`}
            className={`letter ${isOutlined ? 'outlined' : 'filled'}`}
            variants={getLetterVariants(index, letters.length)}
          >
            {letter}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default AnimatedWord;
