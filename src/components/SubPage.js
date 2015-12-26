import React, { Component } from "react";
import { connectToStores } from "fluxible-addons-react";

import {setSubPageLoading} from "../actions/AppActionCreators";

@connectToStores(["AppStore"], function(context, props) {
  console.log(props.context.getStore("AppStore").showLoadingSubPage());
  return ({
    showLoadingSubPage: props.context.getStore("AppStore").showLoadingSubPage(),
  })
  }
)
class SubPage extends Component {
  constructor(props) {
    super();
    props.context.executeAction(setSubPageLoading, true);
  }

  componentDidMount() {
    this.props.context.executeAction(setSubPageLoading, false);
  }

  render() {
    return <div></div>;
  }
}

export default SubPage;
