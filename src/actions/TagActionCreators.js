import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const TagActionCreators = {

  loadTags(context, {}, done) {
    context.service.read("tags", {}, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_TAGS_SUCCESS, {
          tags: data
        });

        done();
      }

    );
  },

  loadTag(context, { name }, done) {
    context.service.read("tag", { name }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_TAG_SUCCESS, data);
        done();
      }

    );
  }

};

export default TagActionCreators;
