import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import reducer from "./store/reducer";
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";

// combineReducers to combine more than one reducer
const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer,
});
// this middleware which is logger middleware outputing someting whenever we dispatching an action
const logger = (store) => {
  return (next) => {
    // this function will be excuted by redux at the end
    return (action) => {
      console.log("[Middlewre] Dispatching", action);
      const result = next(action);
      console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};
// compose is a little bit similar to combineReducers
// combineReducers allow us to combine reducers
// compose allows us to combine enhancers
// applyMiddleware is only for Middlewares
const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer);
const store = createStore(
  rootReducer,
  composeEnchancers(applyMiddleware(logger, thunk))
);
// here you can pass a list of middleware arguments to applyMiddleware they will be excuted in oredered, here we only have one though

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
