import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const UserActionCreators = {

  loadUsers(context, {}, done) {
    context.service.read("users", {}, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_USERS_SUCCESS, {
          users: data
        });

        done();
      }

    );
  },

  loadParty(context, { name }, done) {
    context.service.read("user", { name }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_USER_SUCCESS, data);
        done();
      }

    );
  }

};

export default UserActionCreators;
