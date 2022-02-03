class GuessState {
    static Correct = new GuessState("correct");
    static SemiCorrect = new GuessState("semiCorrect");
    static Wrong = new GuessState("wrong");
    static Unknown = new GuessState("unknown")

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
}

export default GuessState;