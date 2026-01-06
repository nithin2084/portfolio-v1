import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import { Container } from 'react-bootstrap';
import LoaderCinematic from './LoaderCinematic';
import BlobBackground from './BlobBackground';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && <LoaderCinematic onComplete={handleLoaderComplete} />}
      {!showLoader && <BlobBackground />}

      <Navbar />
    </>
  );
}

export default App;