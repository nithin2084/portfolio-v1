import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import { Container } from 'react-bootstrap';
import LoaderCinematic from './LoaderCinematic';
import BlobBackground from './BlobBackground';
import HomePage from './HomePage';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      {/* Cinematic loader - shows first */}
      {showLoader && <LoaderCinematic onComplete={handleLoaderComplete} />}
      
      {/* After loader completes, show homepage content */}
      {!showLoader && (
        <>
          {/* Three.js blob background - fixed behind all content */}
          <BlobBackground />
          
          {/* Homepage with hero text and NITHIN brand */}
          <HomePage />
        </>
      )}

      {/* Navbar - always on top */}
      <Navbar />
    </>
  );
}

export default App;