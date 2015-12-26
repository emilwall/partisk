import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const QuestionActionCreators = {

  loadQuestions(context, {}, done) {
    context.service.read("questions", {}, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_QUESTIONS_SUCCESS, {
          questions: data
        });

        done();
      }

    );
  },

  loadQuestion(context, { title }, done) {
    context.service.read("question", { title }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_QUESTION_SUCCESS, data);
        done();
      }

    );
  },

  starQuestion(context, data, done) {
    context.dispatch(Actions.QUESTION_STARRED, data);
    done();
  }
};

export default QuestionActionCreators;
