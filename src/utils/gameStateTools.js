import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { parseGameString } from './gameLogic';

// Don't export this so we control how components wire into the state
const CurrentGameContext = React.createContext();

const defaultState = {
    games: readValueFromLocalStorage('currentGames', []),
    currentGameId: '',
    currentGameStatus: {
        answer: '',
        guessState: [''],
        creationTime: Date.now()
    }
}

// Likely we can abstract this to another module at some point
export function getGameFromLocalStorage(gameId) {
    const existingState = window.localStorage.getItem(gameId);
    return existingState?
        JSON.parse(existingState):
        {...defaultState.currentGameStatus};
}

function writeGameToLocalStorage(gameId, gameState) {
    window.localStorage.setItem(gameId, JSON.stringify(gameState));
}

function writeToLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function readValueFromLocalStorage(key, defaultValue) {
    const existingValue = window.localStorage.getItem(key);
    return existingValue?
        JSON.parse(existingValue):
        defaultValue;
}

/**
 * Only hooks in this file dispatch to the reducer directly for now
 * Actions:
 * * updateGameState: Updates the guessState of the current game
 * * changeCurrentGameState
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
function currentGameReducer(state, action) {
    const {type} = action;
    switch (type) {
        case 'updateGameState': {
            const currentGameStatus = {
                ...state.currentGameStatus,
                ...action.newState
            };
            writeGameToLocalStorage(state.currentGameId, currentGameStatus);
            return {...state, currentGameStatus}
        }
        case 'changeCurrentGame': {
            const {gameId} = action;
            // Having a side-effect here feels weird, maybe remove?
            const storedState = getGameFromLocalStorage(gameId);
            const currentGameStatus = {
                ...state.currentGameStatus, 
                ...storedState}
            return {...state, currentGameStatus, currentGameId:gameId}
        }
        case 'addNewGame': {
            const {gameId, answer} = action.game;
            const gameList = [...state.games, gameId]
            if(state.games.includes(gameId)) return state;
            writeGameToLocalStorage(
                gameId, 
                {...defaultState.currentGameStatus,
                    creationTime:Date.now(),
                    answer});
            writeToLocalStorage('currentGames', gameList);
            return {...state, games:gameList}
        }
        case 'removeGame': {
            throw new Error('not implemented yet')
        }
        case 'readGamesList': {
            const games = readValueFromLocalStorage('currentGames', [])
            return {...state, games}
        }
        default:
            throw new Error(`Unexpected action type: ${type}`)
    }
}

/**
 * 
 * @returns 
 */
export function useCurrentGameState() {
    const [
        {currentGameStatus:{answer, guessState}}, 
        dispatch] = useContext(CurrentGameContext);
    const updateGuessState = newGuessState => dispatch({
        type:'updateGameState', 
        newState:{guessState:newGuessState}
    });
    return [{answer, guessState}, updateGuessState]
}

/**
 * 
 * @returns 
 */
export function useChangeCurrentGame() {
    const [
        {currentGameId:oldGameId}, 
        dispatch] = useContext(CurrentGameContext);
    return [oldGameId, gameId => dispatch({type:'changeCurrentGame', gameId})];
}

export function useGamesList() {
    const [
        {games}, 
        dispatch] = useContext(CurrentGameContext);
    const addGame = (gameId, answer) => dispatch(
        {type: 'addNewGame', game:{gameId, answer}});
    const removeGame = gameId => dispatch({type: 'removeGame', gameId});
    return [games, addGame, removeGame]
}

function useCheckForNewGame(addNewGame) {
    useEffect(() => {
        const cleanedSearchParams = window.location.search.replace('?', '');
        const game = new URLSearchParams(cleanedSearchParams).get('newGame');
        if(game) {
            try {
                const parsedGame = parseGameString(game);
                addNewGame(parsedGame)
                window.location.search = '';
            } catch (e) {
                console.log(e)
            }
        }
    }, [addNewGame])
}

/**
 * Wrapper that handles all state updates related to game status. 
 * Downstream consumers should use proivided hooks to wire into the state 
 * parts they want instead of using the context directly 
 * (it's why don't export it from this module)
 * @param {object} props 
 * @param {JSX.Element[]} props.children
 * @returns 
 */
export function ProvideGameState({children}) {
    const [state, dispatch] = useReducer(currentGameReducer, defaultState);
    const addNewGame = useCallback(
        parsedGame => dispatch({type: 'addNewGame', game:parsedGame}),
        [dispatch])
    useCheckForNewGame(addNewGame)
    return <CurrentGameContext.Provider value={[state, dispatch]}>
        {children}
    </CurrentGameContext.Provider>
}
ProvideGameState.propTypes = {
    children: PropTypes.object
}