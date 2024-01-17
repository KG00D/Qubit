import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from "redux";

import thunk from "redux-thunk";
import sessionReducer from "./session";
import accountsReducer from "./account";
import assetHoldingsReducer from "./assetHolding";
// import transactionsReducer from "./assetTransaction";

const rootReducer = combineReducers({
    session: sessionReducer,
    accounts: accountsReducer,
    holdings: assetHoldingsReducer,
    // transactions: transactionsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
