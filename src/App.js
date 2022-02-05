import './App.css';
import Keyboard from './Keyboard';
import GuessField from './GuessField';
import React, { useState } from 'react';

function App() {
  const answer = "MOIST"
  const [pastGuesses, setPastGuesses] = useState([""]);
  const handleSubmit = () => {
    if(pastGuesses.at(-1).length == 5 && pastGuesses.length <= 6) {
      setPastGuesses([...pastGuesses,""]);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
          {[...Array(6).keys()].map(i => {
            return <GuessField guess={pastGuesses[i]??""} answer={answer} submitted={pastGuesses.length-1>i} key={`GuessField ${i}`} />
          })}
          <Keyboard answer={answer} guesses={pastGuesses} onChange={g => setPastGuesses([...pastGuesses.slice(0, pastGuesses.length-1),g])} onSubmit={handleSubmit} />
      </header>
    </div>
  );
}

export default App;
