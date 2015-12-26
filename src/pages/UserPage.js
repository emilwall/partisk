import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { decodeURL } from "../utils/Utils";

import SubPage from "../components/SubPage";

@connectToStores(["UserStore"], (context, props) =>
  ({ user: context.getStore("UserStore").getUserByName(decodeURL(props.name)) })
)
class UserPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>{ user.name }</h1>
      </div>
    );
  }

}

export default UserPage;
