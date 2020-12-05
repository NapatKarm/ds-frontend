
// Action Types
const USER_CREATION = "USER_CREATION";
const ERROR = "Error";
const USER_CHANGE = "USER_CHANGE";

//Action Creator
const userCreation = (userinfo) => {
    return {
        type: USER_CREATION,
        payload: userinfo
    }
}

const error = (err) => {
    return {
        type: ERROR,
        payload: err
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
        res = userinfo+" (TEMPORARY)";
        console.log(userinfo,res,"Userinfo changed");
        dispatch(userCreation(res));
    }
    catch (fetchError) {
        dispatch(error(fetchError));
    }
}

export const userChangeThunk = (username) => async (dispatch) => {
    try {
        //send info to delete on the backend yo
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