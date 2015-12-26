import React, { PropTypes } from "react";
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class LoadingPage extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  }

  render() {
    let content = this.props.visible ? (
        <div key="loader" id="loading-page">
          <div id="spinner">
            <div className="spinner-inner"></div>
            <div className="spinner-outer"></div>
            <div className="text">PARTISK</div>
          </div>
        </div>
      ) : null;
    let transitionTimeOut = 500;

    return <ReactCSSTransitionGroup transitionName="loader" transitionAppear={true} component="div"
            transitionAppearTimeout={transitionTimeOut} transitionEnterTimeout={transitionTimeOut} transitionLeaveTimeout={transitionTimeOut}>
      {content}
    </ReactCSSTransitionGroup>
  }

}

export default LoadingPage;
