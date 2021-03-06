import { combineReducers, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//reducer functions
import tempuser from "./utilities/tempuser";
import lobbyinfo from "./utilities/lobbyinfo";
import promptinfo from "./utilities/promptinfo";

const rootReducer = combineReducers({tempuser,lobbyinfo, promptinfo});
const logger = createLogger({ collapsed: true });
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, logger));
const store = createStore(rootReducer, middleware);

export default store;