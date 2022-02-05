import Keyboard from './Keyboard';
import GuessField from './GuessField';
import React, { useState } from 'react';

function MainGame({answer, validGuesses}) {
  const [pastGuesses, setPastGuesses] = useState([""]);
  const handleSubmit = () => {
    const currentGuess = pastGuesses[pastGuesses.length-1];
    if(currentGuess.length === 5 && pastGuesses.length <= 6 && validGuesses.has(currentGuess)) {
      setPastGuesses([...pastGuesses,""]);
    }
  }
  return (
    <div className="App-header">
        {[...Array(6).keys()].map(i => {
        return <GuessField guess={pastGuesses[i]??""} answer={answer} submitted={pastGuesses.length-1>i} key={`GuessField ${i}`} />
        })}
        <Keyboard answer={answer} guesses={pastGuesses} onChange={g => setPastGuesses([...pastGuesses.slice(0, pastGuesses.length-1),g])} onSubmit={handleSubmit} />
    </div>
  );
}

export default MainGame;
