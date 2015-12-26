import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import {Map} from "immutable";
import _ from "underscore";

class UserStore extends BaseStore {

  static storeName = "UserStore"

  static handlers = {
    [Actions.LOAD_USERS_SUCCESS]: "handleLoadUsersSuccess",
    [Actions.LOAD_USER_SUCCESS]: "handleLoadUserSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.users = new Map();
    this.usersLoaded = false;
  }

  handleLoadUserSuccess(user) {
    this.users = this.users.set(user.id, user);
    this.emitChange();
  }

  handleLoadUsersSuccess({ users }) {
    _.each(users, function (user) {
      this.users = this.users.set(user.id, user);
    }, this);

    this.usersLoaded = true;
    this.emitChange();
  }

  getUser(id) {
    return this.users.find(user =>
      user.id === id
    );
  }

  getUsers() {
    return this.users;
  }

  isUsersLoaded() {
    return this.usersLoaded;
  }

  isUserLoaded(id) {
    return this.users.has(id);
  }

  dehydrate() {
    return {
      users: this.users,
      usersLoaded: this.usersLoaded
    };
  }

  rehydrate(state) {
    this.users = new Map(state.users);
    this.usersLoaded = state.usersLoaded;
    this.emitChange();
  }
}

export default UserStore;
