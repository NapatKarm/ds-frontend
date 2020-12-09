
// Action Types
const PARSE_PROMPT = "PARSE_PROMPT"
const RESET_PROMPT = "RESET_PROMPT"

// Action Creator
const parsePrompt = (textString, textArr, textArrLength) => {
    return {
        type: PARSE_PROMPT,
        payload: {
            textString: textString,
            textArr: textArr,
            textArrLength: textArrLength
        }
    }
}
const resetPrompt = () => {
    return {
        type: RESET_PROMPT,
        payload: {}
    }
}

// Thunks
export const parsePromptThunk = (prompt) => (dispatch) => {
    let textString = ''
    let textArr= []
    let textArrLength = 0

    let replacedPrompt = prompt.replaceAll('|', '')

    textString = replacedPrompt
    textArr = prompt.split('|')
    textArrLength = replacedPrompt.length

    console.log(prompt.replaceAll('|', ''), "\n", prompt.split('|'))

    dispatch(parsePrompt(textString, textArr, textArrLength));
}

export const resetPromptThunk = () => (dispatch) => {
    dispatch(resetPrompt());
}

export default (state = {}, action) => {
    switch (action.type) {
        case PARSE_PROMPT:
            return action.payload;
        case RESET_PROMPT:
            return action.payload;
        default:
            return state;
    }
}