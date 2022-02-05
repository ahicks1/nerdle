import './App.css';
import React, { useState, useEffect } from 'react';
import MainGame from './MainGame';
import getWordSet from './getWordSet';
import { cleanString } from './gameLogic';

function App() {
  const validGuesses = getWordSet();
  const [answer, setAnswer] = useState(() => {
    const saved = localStorage.getItem("word");
    const initialValue = saved;
    return initialValue || "MOIST";
  })
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const newWord = queryParams.get('newGame');
    if(newWord && validGuesses.has(cleanString(newWord))) {
      localStorage.setItem('word', cleanString(newWord) );
      window.location.search = '';
    }
  })
  return (
    <div className="App">
      <header className="App-header">
        <MainGame answer={answer} validGuesses={validGuesses}/>
      </header>
    </div>
  );
}

export default App;
