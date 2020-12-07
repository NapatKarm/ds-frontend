import socket from '../../components/socket'; 

// Action Types
const LOBBY_UPDATE = "LOBBY_UPDATE";
const LOBBY_LEAVE = "LOBBY_LEAVE";

//Action Creator
const lobbyUpdate = (lobbyName,users) => {
    return {
        type: LOBBY_UPDATE,
        payload: {
            lobbyName: lobbyName,
            users: users
        }
    }
}

const lobbyLeave = () => {
    return {
        type: LOBBY_LEAVE,
    }
}
// Thunks
export const lobbyLeaveThunk = () => (dispatch) =>{
    dispatch(lobbyLeave());
}
export const lobbyUpdateThunk =  (users) => async (dispatch) => {
    if(users!==undefined) dispatch(lobbyUpdate(users[0].lobbyCode,users));
    else console.log("Users undefined")
}

// Reducer Function
export default (state = {},action) => {
    switch (action.type) {
        case LOBBY_UPDATE:
            return action.payload;
        case LOBBY_LEAVE:
            return {}
        default:
            return state;
    }
}