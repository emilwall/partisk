import Actions from "../constants/Actions";

const TIMEOUT = 20000;

const AppActionCreators = {

  appDehydrated(context, {}, done) {
    setTimeout(function () {
        context.dispatch(Actions.APP_REHYDRATED, {});
        done();
    }, 10);
  },

  setLoading(context, data, done) {
    context.dispatch(Actions.SET_LOADING, data);
    done();
  },

  setSubPageLoading(context, data, done) {
    context.dispatch(Actions.SET_SUB_PAGE_LOADING, data);
    done();
  },

  navigationClick(context, data, done) {
    context.dispatch(Actions.NAVIGATE_LINK_CLICK, data);
    done();
  },

  loadSettings(context, {}, done) {
    context.service.read("settings", {}, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_SETTINGS_SUCCESS, data);

        done();
      }
    );
  }
};

export default AppActionCreators;
