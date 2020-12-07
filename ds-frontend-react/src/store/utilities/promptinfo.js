
// Action Types
const PARSE_PROMPT = "PARSE_PROMPT"

// Action Creator
const parsePrompt = (prompt) => {
    return {
        type: PARSE_PROMPT,
        payload: prompt
    }
}


// Thunks
export const parsePromptThunk = (prompt) => (dispatch) => {
    dispatch(parsePrompt(prompt));
}

export default (state = {}, action) => {
    switch (action.type) {
        case PARSE_PROMPT:
            return action.payload;
        default:
            return state;
    }
}