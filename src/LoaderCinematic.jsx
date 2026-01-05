import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedWord from './AnimatedWord';
import useLoaderTimeline from './useLoaderTimeline';
import './loader.css';

/**
 * Loader Component
 * 
 * Cinematic full-screen loader with:
 * - Masked word container (overflow: hidden prevents layout shifts)
 * - Sequential word replacement animation
 * - Diagonal motion effect via letter stagger
 * - Final word (NITHIN) zooms toward viewer WITHOUT exiting
 * - Horizontal split triggers DURING zoom for cinematic hard cut
 * 
 * CRITICAL: NITHIN must NEVER use exit animation
 * The split starts while zoom is still happening (not after)
 */

const Loader = ({ onComplete }) => {
  const { currentWord, isComplete, shouldZoom, shouldSplit } = useLoaderTimeline();

  // Notify parent when loader completes
  React.useEffect(() => {
    if (isComplete && onComplete) {
      const timer = setTimeout(onComplete, 100);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loader-fullscreen"
          initial={{ opacity: 1 }}
        >
          {/* Horizontal split animation - top half */}
          <motion.div
            className="loader-split-top"
            initial={{ y: 0 }}
            animate={shouldSplit ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }} // Faster split (was 1s)
          />

          {/* Horizontal split animation - bottom half */}
          <motion.div
            className="loader-split-bottom"
            initial={{ y: 0 }}
            animate={shouldSplit ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }} // Faster split (was 1s)
          />
          {/* 
            Masked text container
            This is critical: overflow: hidden clips any letters that move outside
            All words animate through this same fixed space
          */}
          <div className="loader-text-mask">
            <AnimatePresence mode="wait">
              {currentWord && (
                <AnimatedWord
                  key={currentWord.text}
                  word={currentWord.text}
                  isFinal={currentWord.isFinal}
                  filledIndices={currentWord.filledIndices}
                  shouldZoom={shouldZoom && currentWord.isFinal}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
