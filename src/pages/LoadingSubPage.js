import React, { PropTypes } from "react";
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

if (process.env.BROWSER) {
  require("../style/Loader.scss");
}

class LoadingSubPage extends React.Component {
  render() {
    let style = {
      zIndex: 10000,
      top: 0,
      left: 0,
      padding: 0,
      margin: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "red"
    }

    return <ReactCSSTransitionGroup transitionName="sub-page-loader" transitionAppear={true} transitionAppearTimeout={3000} transitionEnterTimeout={300} transitionLeaveTimeout={300} component="div">
      <div key="sub-page-loader" style={style}>hej</div>
    </ReactCSSTransitionGroup>
  }
}

export default LoadingSubPage;
