
import axios from 'axios';
// Action Types
const USER_CREATION = "USER_CREATION";
const ERROR = "Error";
const USER_CHANGE = "USER_CHANGE";

//Action Creator
const userCreation = (userinfo) => {
    return {
        type: USER_CREATION,
        payload: {
            Username: userinfo
        }
    }
}

const error = (err) => {
    return {
        type: ERROR,
        payload: {
            ErrorCode: err.response.data
        }
    }
}

const userChange = () => {
    return {
        type: USER_CHANGE
    }
}

// Thunks
export const userCreationThunk = (userinfo) => async (dispatch) => {
    let res;
    try {
        res = await axios.post(`http://35.239.70.1:8000/addUser`, {
            Username: userinfo,
        })
        dispatch(userCreation(userinfo));
    }
    catch (fetchError) {
        dispatch(error(fetchError));
    }
}

export const userChangeThunk = (username) => async (dispatch) => {
    try {
        await axios.delete(`http://35.239.70.1:8000/deleteUser`, { data: { Username: username } });
        dispatch(userChange());
    }
    catch (fetchError) {
        dispatch(error(fetchError));
    }
}

// Reducer Function
export default (state = {},action) => {
    switch (action.type) {
        case USER_CREATION:
            return action.payload;
        case ERROR:
            return action.payload;
        case USER_CHANGE:
            return {};
        default:
            return state;
    }
}