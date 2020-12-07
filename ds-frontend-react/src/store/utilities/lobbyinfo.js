import socket from '../../components/socket'; 

// Action Types
const LOBBY_UPDATE = "LOBBY_UPDATE";
const LOBBY_ERROR = "LOBBY_ERROR";

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

const lobbyError = (err) => {
    return {
        type: LOBBY_ERROR,
        payload: {
            error: err
        }
    }
}
// Thunks
export const lobbyJoinThunk =  (tempuser, lobbyID) => async (dispatch) => {
    let errorReturned;
    let usersReturned;
    await socket.emit('joinLobby',{lobbyCode:lobbyID, username: tempuser})
    try {
        await socket.on("lobbyUpdate", ({error, users}) => {
            errorReturned= error;
            usersReturned= users;
        })
        console.log("From join thunk",errorReturned,usersReturned)
        if(errorReturned!==undefined) dispatch(lobbyError(errorReturned));
        dispatch(lobbyUpdate(lobbyID, usersReturned))
    }
    catch (fetchError) {
        dispatch(lobbyError(fetchError));
    }       

}

export const lobbyCreateThunk =  (tempuser) => async (dispatch) => {
    // let lobbyCodeReturned;
    // let errorReturned;
    // let usersReturned;
    // socket.emit('createLobby', {username: tempuser})
    // try {
    //     await socket.on("createLobbyResponse", ({lobbyCode}) => {lobbyCodeReturned=lobbyCode});
    //      socket.on("lobbyUpdate", ({error, users}) => {
    //         console.log("THIS IS RUNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNING")
    //         errorReturned= error;
    //         usersReturned= users;
    //     }) 
    //     console.log("From create thunk",errorReturned,usersReturned,lobbyCodeReturned)
    //     // if(errorReturned!==null) dispatch(lobbyError(errorReturned));
    //     dispatch(lobbyUpdate(lobbyCodeReturned, usersReturned))
    // }
    // catch (fetchError) {
    //     dispatch(lobbyError(fetchError));
    // }    
    console.log("Under construction?")
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