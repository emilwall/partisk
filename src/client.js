require("babel/polyfill");

import React from "react";
import ReactDOM from "react-dom";
import IntlUtils from "./utils/IntlUtils";

import {appDehydrated} from "./actions/AppActionCreators";

// Add promise support for browser not supporting it
import es6Promise from "es6-promise";
es6Promise.polyfill();

window.debug = require("debug");

const debug = window.debug("isomorphic500");

const mountNode = document.getElementById("root");
const dehydratedState = window.App;
function renderApp() {

  const app = require("./app");

  debug("Rehydrating state...", dehydratedState);

  app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
      throw err;
    }

    context.executeAction(appDehydrated, {}, function () {
      console.log("State has been rehydrated");
      const Application = app.getComponent();

      ReactDOM.render(<Application context={context.getComponentContext()} />, mountNode, () => {
        debug("Application has been mounted");
      });
    });
  });
}

// Load the Intl polyfill and required locale data
const locale = document.documentElement.getAttribute("lang");

IntlUtils.loadIntlPolyfill(locale)
  .then(IntlUtils.loadLocaleData.bind(null, locale))
  .then(renderApp)
  .catch((err) => {
    console.error(err);
  });
