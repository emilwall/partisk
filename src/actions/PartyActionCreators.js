import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const PartyActionCreators = {

  loadParties(context, {}, done) {
    context.service.read("parties", {}, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_PARTIES_SUCCESS, {
          parties: data
        });

        done();
      }

    );
  },

  loadParty(context, { name }, done) {
    context.service.read("party", { name }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_PARTY_SUCCESS, data);
        done();
      }
    );
  }

};

export default PartyActionCreators;
