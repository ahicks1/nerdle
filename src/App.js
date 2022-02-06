import './App.css';
import React, { useState, useEffect } from 'react';
import MainGame from './MainGame';
import getWordSet from './getWordSet';
import { cleanString, decodeWord } from './gameLogic';
import WinDialog from './WinDialog';
import useStorageState from './utils/useStorageState';

function useAnswer(validGuesses) {
  const [
    encodedAnswer, 
    setEncodedAnswer, 
    resetEncodedAnswer
  ] = useStorageState('word', '');

  // On first load, check for newGame query param
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const newWord = queryParams.get('newGame');
    if(newWord && validGuesses.has(cleanString(decodeWord(newWord)))) {
      setEncodedAnswer(newWord)
      window.localStorage.removeItem('gameState');
      window.location.search = '';
    }
  })
  try {
    return decodeWord(encodedAnswer)
  } catch (e) {
    resetEncodedAnswer();
    return 'WRONG'
  }
}

function App() {
  const validGuesses = getWordSet();
  const [won, setWon] = useState();
  const answer = useAnswer(validGuesses);
  
  return (
    <div className="App">
      <header className="App-header">
        <WinDialog isOpen={won} />
        <MainGame 
            answer={answer} 
            validGuesses={validGuesses} 
            onWin={(winningList, answer) => setWon([...winningList,answer])}/>
      </header>
    </div>
  );
}

export default App;
