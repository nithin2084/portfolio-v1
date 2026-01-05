import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroAnimation.css';

const IntroAnimation = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Total intro duration: ~3.5 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
      if (onComplete) {
        setTimeout(onComplete, 800); // Wait for exit animation
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="intro-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Animated fluid blob */}
          <div className="blob-container">
            <div className="blob"></div>
          </div>

          {/* Text animation sequence */}
          <div className="intro-text-container">
            {/* Main text: "Welcome to Portfolio" */}
            <motion.div
              className="intro-text-main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              Welcome to Portfolio
            </motion.div>

            {/* Signature name: "Nithin" */}
            <motion.div
              className="intro-text-name"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1,
                delay: 1.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              Nithin
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
