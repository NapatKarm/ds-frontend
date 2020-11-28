
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
        res = userinfo+"TEMPORARY";
    }
    catch (fetchError) {
        return dispatch(error(fetchError));
    }
    console.log(userinfo,res,"Userinfo changed");
    dispatch(userCreation(res));
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