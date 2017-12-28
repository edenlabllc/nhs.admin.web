import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from "redux-thunk";
import multiMiddleware from "redux-multi";
import { apiMiddleware } from "redux-api-middleware";

import rootReducer from "../reducers";

const middlewares = [multiMiddleware, promiseMiddleware, apiMiddleware];

if (process.NODE_ENV !== "production") {
  middlewares.push(require("redux-freeze"));
}

export function configureStore({ history, i18n, req }, initialState) {
  const createStoreWithMiddleware = compose(
    applyMiddleware.apply(
      this,
      middlewares.concat([
        routerMiddleware(history),
        thunkMiddleware.withExtraArgument({ i18n, req })
      ])
    ),
    process.NODE_ENV !== "production" &&
    global.window &&
    window.devToolsExtension
      ? window.devToolsExtension()
      : f => f
  )(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
}
