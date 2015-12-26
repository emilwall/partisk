import React, { PropTypes, Component } from "react";
import { provideContext, connectToStores } from "fluxible-addons-react";
import { handleHistory } from "fluxible-router";

import Page from "./components/Page";
import SubPage from "./components/SubPage";
import Immutable from "immutable";

import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import {setLoading} from "./actions/AppActionCreators";

import trackPageView from "./utils/trackPageView";

if (process.env.BROWSER) {
  require("./style/Application.scss");
}

// Wrap Application with the fluxible context.
// PS. new to this syntax? Those are called "decorators", see
// https://babeljs.io/docs/usage/experimental/
@provideContext

// Wrap with fluxible-router's history handler (required for routing)
// This also passes `currentRoute` as prop to the component
@handleHistory

// Listen to HtmlHeadStore and pass the document title to the component
@connectToStores(["HtmlHeadStore", "AppStore"], (context) =>
  ({
    documentTitle: context.getStore("HtmlHeadStore").getTitle(),
    showLoadingPage: context.getStore("AppStore").showLoadingPage()
  })
)

class Application extends Component {
  static propTypes = {

    // props coming from fluxible-router's handleHistory
    isNavigateComplete: PropTypes.bool,
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    }),

    // prop coming from HtmlHeadStore
    documentTitle: PropTypes.string

  }

  componentDidUpdate(prevProps) {
    const { documentTitle, currentRoute } = this.props;

    if (prevProps.documentTitle !== documentTitle) {
      document.title = documentTitle;
    }

    if (!Immutable.is(prevProps.currentRoute, currentRoute)) {
      trackPageView(currentRoute.get("url"));
    }
  }

  componentDidMount() {
    this.props.context.executeAction(setLoading, false);
  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete, showLoadingPage } = this.props;

    let Handler = currentRoute && currentRoute.get("handler");

    let content;

    let loading = <LoadingPage visible={showLoadingPage} />;

    if (currentNavigateError && currentNavigateError.statusCode === 404) {
      // This "not found" error comes from a page init actions (InitActions.js)
      // e.g. when a 500px API responds 404
      content = <NotFoundPage />;
    }
    else if (currentNavigateError) {
      // Generic error, usually always with statusCode 500
      content = <ErrorPage err={currentNavigateError} />;
    }
    else if (!Handler) {
      // No handler: this is another case where a route is not found (e.g.
      // is not defined in the routes.js config)
      content = <NotFoundPage />;
    }
    else {
      // Here you go with the actual page content
      const params = currentRoute.get("params").toJS();
      content = (
        <Handler {...params} />
      );
    }
    return (
      <div>
        {loading}
        <Page footer={isNavigateComplete} context={this.props.context}>
          { content }
        </Page>
      </div>
    );
  }
}

export default Application;
