import React, { useState, useEffect, useCallback } from 'react';

import { loadPyodide } from 'pyodide';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import InfoBox from './components/InfoBox';
import Form from './components/Form';
import KeyInput from './components/KeyInput';
import LoadingPage from './components/LoadingPage';
import Header from './components/Header';
import FooterComp from './components/Footer';
import VoteResult from './components/VoteResultCard';

function App() {

  // States, um die verschiedenen Daten und Zustände der Anwendung zu verwalten
  const [validKey, setValidKey] = useState(false);
  const [pyodideInstance, setPyodideInstance] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [voteData, setVoteData] = useState(null);

  // useEffect, um die Abstimmungsergebnisse beim Start und danach alle 10 Sekunden zu laden
  useEffect(() => {
    async function getVoteData() {
      try {
        const result = await fetch('https://api.axelverga.me/vote_results');
        const data = await result.json();
        setVoteData(data);
      } catch (error) {
        console.error('Error fetching vote data:', error);
      }
    }

    getVoteData();
    const interval = setInterval(getVoteData, 10000);


    // useCallback, um Pyodide einmalig beim Start zu initialisieren
    return () => {
      clearInterval(interval);
    };
  }, []);

  // useCallback, um Pyodide einmalig beim Start zu initialisieren
  const initializePyodide = useCallback(async () => {
    try {
      const instance = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/npm/pyodide@0.23.4',
      });
      setPyodideInstance(instance);
      setLoadingPage(false);
    } catch (error) {
      console.error('Error initializing Pyodide:', error);
    }
  }, []);

  // useEffect, um die Initialisierungsfunktion von Pyodide beim Start aufzurufen
  useEffect(() => {
    initializePyodide();
  }, [initializePyodide]);

  return (
    <div className='flex flex-col h-full w-full'>

      <Header />

      <main className='flex flex-col items-center px-8 pb-8 gap-10 w-full h-full'>

        {/*Mit diesem Code wird ein Benachrichtigungs-Popup angezeigt*/}
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="relative"
        />

        {/* Zeigt beim Start die Ladeseite an */}
        {loadingPage ? (
          <LoadingPage />
        ) : (

          <>
            {/* Formular nur anzeigen, wenn der Schlüssel gültig ist */}
            {/* Sonst Input für den Schlüssel anzeigen */}
            {validKey ? (
              <Form
                pyodideInstance={pyodideInstance}
              />
            ) : (
              <KeyInput
                pyodideInstance={pyodideInstance}
                setValidKey={setValidKey}
              />
            )}

            {/*  Infobox für Fragen und Antworten */}
            <InfoBox />

            {/*  Ergebnisse der Live-Abstimmungen */}
            {voteData !== null ? (
              <VoteResult voteData={voteData}/>
            ) : (
              <p>{error || 'Laden der Ergebnisse...'}</p>
            )}

            {/* Footer */}
            <FooterComp />

          </>
        )}
      </main>
    </div>
  );
}


export default App;
