import words from './words.json'

function getWordSet() {
    return new Set(words);
}

export default getWordSet;