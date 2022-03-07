import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

// IMPORTING REDUCERS
import allDataRed from "./reducer";

const middleware = applyMiddleware(thunk, logger);

const rootReducer = combineReducers({
	allDataRed,
});

const store = createStore(rootReducer, middleware);
export default store;
