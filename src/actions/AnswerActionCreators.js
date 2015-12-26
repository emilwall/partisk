import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const AnswerActionCreators = {

  loadAnswers(context, {}, done) {
    context.service.read("answers", {}, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_ANSWERS_SUCCESS, {
          answers: data
        });

        done();
      }

    );
  },

  loadAnswer(context, { questionId, partyId }, done) {
    context.service.read("answer", { questionId, partyId }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_ANSWER_SUCCESS, data);
        done();
      }

    );
  }

};

export default AnswerActionCreators;
