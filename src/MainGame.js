import Keyboard from './Keyboard';
import GuessField from './GuessField';
import React from 'react';
import PropTypes from 'prop-types';
import useStorageState from './utils/useStorageState';
import { encodeWord } from './gameLogic';

/**
 * 
 * @param {object} props 
 * @returns 
 */
function MainGame({answer, validGuesses, onWin}) {
  const [guesses, setGuesses, resetGuesses] = useStorageState('gameState',['']);

  const isValidGuess = guess => { 
    return guess.length === 5 && 
    guesses.length <= 6 &&
    validGuesses.has(guess)
  };

  const handleSubmit = () => {
    const currentGuess = guesses[guesses.length-1];
    console.log(encodeWord(currentGuess))
    if (isValidGuess(currentGuess)) {
      if (currentGuess === answer || guesses.length === 6) {
        resetGuesses()
        onWin(guesses, answer)
      } else {
        // Add a new blank guess to guesses
        setGuesses([...guesses,'']);
      }
    }
  }
  
  const updateGuesses = newGuess => {
    // Drop the current most recent guess and replace it with newGuess
    setGuesses([...guesses.slice(0, guesses.length-1), newGuess])
  }

  const guessRows = [...Array(6).keys()].map(i => <GuessField
        guess={guesses[i]??""} 
        answer={answer}
        submitted={guesses.length-1>i}
        key={`GuessField ${i}`} />
  );
  
  return (
    <div className="MainGame">
        {guessRows}
        <Keyboard 
            answer={answer} 
            guesses={guesses} 
            onChange={updateGuesses} 
            onSubmit={handleSubmit} />
    </div>
  );
}
MainGame.propTypes = {
  answer: PropTypes.string.isRequired,
  validGuesses: PropTypes.instanceOf(Set).isRequired,
  onWin: PropTypes.func
}

export default MainGame;
