/**
 * Takes a string and returns at most 5 uppercase alphabetic characters
 * @param {String} string 
 * @returns 
 */
 function cleanString(string) {
    return string
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .substring(0,5)
  }

function Keyboard({guess, onChange, onSubmit}) {
    return (<div>
        <input value={guess} onChange={e => onChange(cleanString(e.target.value))}/>
        <button onClick={onSubmit} > SUBMIT </button>
    </div>);
}

export default Keyboard;