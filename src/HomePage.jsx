import React from 'react';
import { motion } from 'framer-motion';
import './HomePage.css';

/**
 * HomePage Component
 * 
 * Features:
 * - Three.js blob background (rendered separately as fixed layer)
 * - Two-word hero text with simultaneous counter-directional animations
 * - Top word: bottom → top
 * - Bottom word: top → bottom
 * - NITHIN brand text in top-left corner
 * - All text layers above blob background
 */

const HomePage = () => {
  // Animation variants for top word (enters from bottom)
  const topWordVariants = {
    hidden: {
      y: 200,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cinematic easing (easeInOutCubic)
        delay: 0.3, // Small delay after page load
      },
    },
  };

  // Animation variants for bottom word (enters from top)
  const bottomWordVariants = {
    hidden: {
      y: -200,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1], // Same duration and easing for synchronization
        delay: 0.3, // Same delay - animations start simultaneously
      },
    },
  };

  // Split word into letters for filled/outlined styling
  const renderStyledWord = (word, className) => {
    return word.split('').map((letter, index) => {
      // Pattern for filled/outlined letters (matching reference image style)
      let filledIndices;
      
      if (className.includes('brand')) {
        // NITHIN: N(0)=filled, I(1)=outlined, T(2)=outlined, H(3)=filled, I(4)=outlined, N(5)=filled
        filledIndices = [0, 3, 5];
      } else if (className.includes('top')) {
        filledIndices = [0, 2, 4, 6]; // Pattern for top word
      } else {
        filledIndices = [1, 3, 5, 7]; // Pattern for bottom word
      }
      
      const isFilled = filledIndices.includes(index);
      
      return (
        <span
          key={index}
          className={`hero-letter ${isFilled ? 'filled' : 'outlined'}`}
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <div className="homepage-container">
      {/* NITHIN brand text - top left */}
      <div className="brand-text">
        {renderStyledWord('NITHIN', 'brand')}
      </div>

      {/* Hero text - center of screen */}
      <div className="hero-text-container">
        {/* Top word - animates from bottom to top */}
        <motion.div
          className="hero-word top-word"
          variants={topWordVariants}
          initial="hidden"
          animate="visible"
        >
          {renderStyledWord('CREATIVE', 'top')}
        </motion.div>

        {/* Bottom word - animates from top to bottom */}
        <motion.div
          className="hero-word bottom-word"
          variants={bottomWordVariants}
          initial="hidden"
          animate="visible"
        >
          {renderStyledWord('PORTFOLIO', 'bottom')}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
