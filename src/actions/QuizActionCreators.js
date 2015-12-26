import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const QuizActionCreators = {

  loadQuizzes(context, {}, done) {
    context.service.read("quizzes", {}, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_QUIZZES_SUCCESS, {
          quizzes: data
        });

        done();
      }

    );
  },

  loadQuiz(context, { name }, done) {
    context.service.read("quiz", { name }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_QUIZ_SUCCESS, data);
        done();
      }

    );
  }

};

export default QuizActionCreators;
