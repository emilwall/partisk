import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import {Map} from "immutable";
import _ from "underscore";

class QuestionStore extends BaseStore {

  static storeName = "QuestionStore"

  static handlers = {
    [Actions.LOAD_QUESTIONS_SUCCESS]: "handleLoadQuestionsSuccess",
    [Actions.LOAD_QUESTION_SUCCESS]: "handleLoadQuestionSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.questions = new Map();
    this.questionsLoaded = false;
  }

  handleLoadQuestionSuccess(question) {
    this.questions = this.questions.set(question.id, question);
    this.emitChange();
  }

  handleLoadQuestionsSuccess({ questions }) {
    _.each(questions, function (question) {
      this.questions = this.questions.set(question.id, question);
    }, this);

    this.questionsLoaded = true;
    this.emitChange();
  }

  getQuestion(id) {
    return this.questions.find(question =>
      question.id == id
    );
  }

  getByTitle(title) {
    const lowerTitle = title.toLowerCase();
    return this.questions.find(question =>
      question.title.toLowerCase() === lowerTitle
    );
  }

  getQuestions() {
    return this.questions;
  }

  isQuestionsLoaded() {
    return this.questionsLoaded;
  }

  isQuestionLoaded(title) {
    return !!this.getByTitle(title);
  }

  dehydrate() {
    return {
      questions: this.questions,
      questionsLoaded: this.questionsLoaded
    };
  }

  rehydrate(state) {
    console.log("rehydrate", state);
    this.questions = new Map(state.questions);
    this.questionsLoaded = state.questionsLoaded;
  }
}

export default QuestionStore;
