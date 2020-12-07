import socket from '../../components/socket'; 

// Action Types
const LOBBY_UPDATE = "LOBBY_UPDATE";

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

// Thunks
export const lobbyUpdateThunk =  (users) => async (dispatch) => {
    if(users!==undefined) dispatch(lobbyUpdate(users[0].lobbyCode,users));
    else console.log("Users undefined")
}

// Reducer Function
export default (state = {},action) => {
    switch (action.type) {
        case LOBBY_UPDATE:
            return action.payload;
        default:
            return state;
    }
}