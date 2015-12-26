import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import _ from "underscore";
import { encodeURL } from "../utils/Utils";

import SubPage from "../components/SubPage";

@connectToStores(["UserStore"], (context, props) =>
  ({ users: context.getStore("UserStore").getUsers() })
)
class UsersPage extends Component {

  static propTypes = {
    users: PropTypes.object.isRequired
  }

  render() {
    const { users } = this.props;

    const usersList = _.map(users, (user, key) =>
      <li key={key}>
        <NavLink routeName="user" navParams={{name: encodeURL(user.name)}}>
          {user.name}
        </NavLink>
      </li>
    );

    return (
      <div>
        <h1>Users</h1>
        <ul>
          {usersList}
        </ul>
      </div>
    );
  }
}

export default UsersPage;
