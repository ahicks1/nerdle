import GuessState from "./GuessState";
import { Buffer } from 'buffer'
import {v4 as uuidv4} from 'uuid';

import words from '../resources/words.json'
/**
 * Encode UTF-8 string into base64
 * @param {string} word 
 * @returns {string} base64 encoding of a UTF-8 encoded string
 */
export function encodeWord(word) {
    return Buffer.from(word).toString('base64');
}

/**
 * Decode base64 string into UTF-8
 * @param {string} word 
 * @returns {string} UTF-8 decoding of a base64 encoded string
 */
export function decodeWord(word) {
    return Buffer.from(word, 'base64').toString();
}

export function getNewGameId() {
    return Buffer.from(uuidv4(), 'hex').toString('base64')
}

export function getWordSet() {
    return new Set(words);
}

/**
 * 
 * @param {string} rawString 
 */
export function parseGameString(rawString) {
    return {
        gameId: rawString.slice(0,24),
        answer: decodeWord(rawString.slice(24))
    }
}

/**
 * 
 * @param {Object} param0
 *  
 * @returns 
 */
export function createGameString(gameId,word) {
    return gameId+encodeWord(word)
}

export function getShareGameLink(word) {
    return `${window.location.host}/${window.location.pathname}?newGame=` +
    `${createGameString(getNewGameId(),word)}`
}

/**
 * Returns for each letter of the guess if it is:
 * * Correct - Right letter in the right place
 * * SemiCorrect - Right letter in the wrong place
 * * Wrong - Letter is not used in answer
 * Correctly handles cases with duplicate letters
 * @param {String} guess 
 * @param {String} answer 
 * @returns {GuessState[]} - The guess states for a given guess and answer combo
 */
export function getGuessStates(guess, answer) {
    let answerSet = [...answer];
    // Start by assuming every letter is wrong
    let states = Array(5).fill(GuessState.Wrong);
    const guessArr = [...guess];
    // Check for Correct guesses
    guessArr.forEach((letter,index) => {
        if(answer[index] === letter) {
            states[index] = GuessState.Correct;
            answerSet.splice(answerSet.findIndex(l => l === letter), 1);
        }
    }) 
    // Check for SemiCorrect guesses, but only update if that
    // letter isn't already marked as correct
    guessArr.forEach( (letter,index) => {
        let idx = answerSet.findIndex(l => l === letter);
        if(idx >= 0 && states[index] === GuessState.Wrong) {
            answerSet.splice(idx, 1);
            states[index] = GuessState.SemiCorrect;
        }
    })
    return states;
}

export function isGameOver(guesses, answer) {
    if(guesses.length < 2) return false;
    const currentGuess = guesses[guesses.length-2];
    return currentGuess === answer || guesses.length === 7
}

/**
 * Computes the guesses and formats a string to be shared by the player
 * @param {string[]} guesses 
 * @param {string} answer 
 * @returns {string} 
 */
export function getShareText(guesses, answer) {
    const emoji = guesses
            .map(guess => getGuessStates(guess, answer))
            .map(states => states.map(state => state.getEmoji()));
    return `Nerdle score: ${guesses.length}/6 \n\n`+
    `${emoji.map(guess => guess.join("")).join('\n')}`
}

/**
 * Takes a string and returns at most 5 uppercase alphabetic characters
 * @param {String} string 
 * @returns 
 */
export function cleanString(string) {
    return string
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .substring(0,5)
}
