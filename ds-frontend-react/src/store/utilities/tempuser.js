
// Action Types
const USER_CREATION = "User_Creation";
const ERROR = "Error";

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

// Reducer Function
export default (state = {},action) => {
    switch (action.type) {
        case USER_CREATION:
            return action.payload;
        case ERROR:
            return action.payload;
        default:
            return state;
    }
}