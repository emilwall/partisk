import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import {Map} from "immutable";
import _ from "underscore";

class QuizStore extends BaseStore {

  static storeName = "QuizStore"

  static handlers = {
    [Actions.LOAD_QUIZZES_SUCCESS]: "handleLoadQuizzesSuccess",
    [Actions.LOAD_QUIZ_SUCCESS]: "handleLoadQuizSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.quizzes = new Map();
    this.quizzesLoaded = false;
  }

  handleLoadQuizSuccess(quiz) {
    this.quizzes = this.quizzes.set(quiz.id, quiz);
    this.emitChange();
  }

  handleLoadQuizzesSuccess({ quizzes }) {
    _.each(quizzes, function (quiz) {
      this.quizzes = this.quizzes.set(quiz.id, quiz);
    }, this);

    this.quizzesLoaded = true;
    this.emitChange();
  }

  getQuiz(id) {
    return this.quizzes.find(quiz =>
      quiz.id === id
    );
  }

  getQuizzes() {
    return this.quizzes;
  }

  isQuizzesLoaded() {
    return this.quizzesLoaded;
  }

  isQuizLoaded(id) {
    return this.quizzes.has(id);
  }

  dehydrate() {
    return {
      quizzes: this.quizzes,
      quizzesLoaded: this.quizzesLoaded
    };
  }

  rehydrate(state) {
    this.quizzes = new Map(state.quizzes);
    this.quizzesLoaded = state.quizzesLoaded;
  }
}

export default QuizStore;
