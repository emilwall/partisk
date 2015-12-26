import React, { Component } from "react";
import { NavLink } from "fluxible-router";

import { navigationClick } from "../actions/AppActionCreators";

class Link extends NavLink {

  clickHandler(e) {
    var context = this.props.context || this.context;
    this.setState({isActive: true});
    context.executeAction(navigationClick);

    if (this.props.callback) {
      this.props.callback();
    }

    super.clickHandler(e);
  }
}

export default Link;
