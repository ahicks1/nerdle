import './App.css';
import React, { useState } from 'react';
import MainGame from './components/MainGame';
import {getWordSet } from './utils/gameLogic';
import WinDialog from './components/WinDialog';
import GameList from './components/GameList';
import { useChangeCurrentGame, useGamesList } from './utils/gameStateTools';

function App() {
  const validGuesses = getWordSet();
  // TODO: improve win detection logic
  const [won, setWon] = useState();
  const [games] = useGamesList();
  const [currentGame, setGame] = useChangeCurrentGame();
  
  return (
    <div className="App">
      <header className="App-header">
        <WinDialog isOpen={won} />
        {!currentGame && <GameList 
          games={games.map(gameId => ({gameId}))} 
          onSelect={gameId => {
            console.log("Setting current game id "+gameId)
            setGame(gameId)
            }}/>}
        {currentGame && <MainGame 
            key={currentGame}
            gameId={currentGame}
            validGuesses={validGuesses} 
            onWin={(winningList, answer) => setWon([...winningList,answer])}/>}
      </header>
    </div>
  );
}

export default App;
