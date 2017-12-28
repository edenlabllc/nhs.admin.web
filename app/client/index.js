import React from "react";
import ReactDOM from "react-dom";

import { AppContainer } from "react-hot-loader";

import { browserHistory, match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import i18n from "services/i18next";

import { configureStore } from "store";
import { configureRoutes } from "routes";

import Root from "./root";

let reduxState = {};

if (window.__REDUX_STATE__) {
  try {
    reduxState = JSON.parse(unescape(__REDUX_STATE__));
  } catch (e) {}
}

const store = configureStore({ history: browserHistory, i18n }, reduxState);

const { dispatch, getState } = store;
const history = syncHistoryWithStore(browserHistory, store);
const trackPage = route => {};
const routes = configureRoutes({ store });

const locals = {
  // Allow lifecycle hooks to dispatch Redux actions:
  dispatch,
  getState
};

const render = (Component, { renderProps }) => {
  ReactDOM.render(
    <AppContainer>
      <Component
        {...{
          renderProps,
          locals,
          store,
          routes,
          i18n,
          history
        }}
      />
    </AppContainer>,
    document.getElementById("root")
  );
};

let lastRenderProps = null;
match({ history, routes }, (error, redirectLocation, renderProps) => {
  lastRenderProps = renderProps;
  render(Root, { renderProps });
});

// enable hot reloading, will be stripped in production
if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept(
    ["./root", "../common/routes", "../common/services/i18next"],
    () => {
      render(Root, lastRenderProps);
    }
  );

  module.hot.accept("../common/reducers", () => {
    const nextRootReducer = require("../common/reducers").default;
    store.replaceReducer(nextRootReducer);
  });
}
