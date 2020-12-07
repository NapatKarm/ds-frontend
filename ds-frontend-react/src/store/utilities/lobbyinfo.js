// Action Types
const LOBBY_UPDATE = "LOBBY_UPDATE";
const LOBBY_ERROR = "LOBBY_ERROR";

//Action Creator
const lobbyUpdate = (lobbyinfo) => {
    return {
        type: LOBBY_UPDATE,
        payload: lobbyinfo
    }
}

const lobbyError = (err) => {
    return {
        type: LOBBY_ERROR,
        payload: err
    }
}

const replyfrombackend = (tempuserx,lobbyIDx) =>{
    return{
    lobbyName: lobbyIDx,
        users: [
            {
                username: tempuserx,
                status: false
            },
            {
                username: "Monkey",
                status: true
            },
            {
                username: "Chicken",
                status: true
            },
            {
                username: "Professional Typing Champion 2012",
                status: true
            },
        ]   
    }
}
// Thunks
export const lobbyUpdateThunk = (tempuser, lobbyID) => async (dispatch) => {
    console.log("THIS RUNS BUT WAIT")
    let res;
    try {
        res = replyfrombackend(tempuser,lobbyID);
        dispatch(lobbyUpdate(res))
    }
    catch (fetchError) {
        dispatch(lobbyError(fetchError));
    }
}

export const lobbyJoinThunk =  (tempuser, lobbyID) => async (dispatch) => {
    console.log("Fake call to backend to add tempuser to lobbyID lobby",tempuser,lobbyID);
    let res = replyfrombackend(tempuser,lobbyID);
    dispatch(lobbyUpdate(res))
}

export const lobbyCreateThunk =  (tempuser) => async (dispatch) => {
    console.log("Fake call to backend to get a new lobby ID and add user to lobby with tempuser",tempuser);
    let lobbyID = "TESTLOBBYCREATE"
    let res = replyfrombackend(tempuser,lobbyID);
    dispatch(lobbyUpdate(res))
}
// Reducer Function
export default (state = {},action) => {
    switch (action.type) {
        case LOBBY_UPDATE:
            return action.payload;
        case LOBBY_ERROR:
            return action.payload;
        default:
            return state;
    }
}