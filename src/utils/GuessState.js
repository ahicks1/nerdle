/**
 * Class used like an Enum to represent the various states for a given letter
 */
class GuessState {
    static Correct = new GuessState("correct");
    static SemiCorrect = new GuessState("semiCorrect");
    static Wrong = new GuessState("wrong");
    static Unknown = new GuessState("unknown")

    /**
     * This shouldn't be called by consumers of the GuessState class
     * @param {string} name 
     */
    constructor(name) {
        this.name = name;
    }

    getCSSClass() {
        switch(this) {
            case GuessState.Correct:
                return "Correct"
            case GuessState.SemiCorrect:
                return "SemiCorrect"
            case GuessState.Wrong:
                return "Wrong"  
            case GuessState.Unknown:
                return "Unknown"
            default:
                return ""
        }
    }
    getEmoji() {
        switch(this) {
            case GuessState.Correct:
                return "🟩"
            case GuessState.SemiCorrect:
                return "🟨"
            case GuessState.Wrong:
                return "⬛"  
            default:
                return ""
        }
    }
}

export default GuessState;