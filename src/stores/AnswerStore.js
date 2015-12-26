import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import {Map} from "immutable";
import _ from "underscore";

class AnswerStore extends BaseStore {

  static storeName = "AnswerStore"

  static handlers = {
    [Actions.LOAD_ANSWERS_SUCCESS]: "handleLoadAnswersSuccess",
    [Actions.LOAD_ANSWER_SUCCESS]: "handleLoadAnswerSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.answers = new Map();
    this.answersLoaded = false;
  }

  handleLoadAnswerSuccess(answer) {
    this.answers = this.answers.set(answer.id, answer);
    this.emitChange();
  }

  handleLoadAnswersSuccess({ answers }) {
    _.each(answers, function (answer) {
      this.answers = this.answers.set(answer.id, answer);
    }, this);

    this.answersLoaded = true;
    this.emitChange();
  }

  getAnswer(id) {
    return this.answer.find(answer =>
      answer.id == id
    );
  }

  getAnswers() {
    return this.answers;
  }

  isAnswersLoaded() {
    return this.answersLoaded;
  }

  isAnswerLoaded(id) {
    return this.answers.has(id);
  }

  isQuestionAnswerLoaded(questionId, partyId) {
    return !!this.answers && !! this.answers.find(function (answer) {
      return answer.question_id == questionId && answer.party_id == partyId
    });
  }

  dehydrate() {
    return {
      answers: this.answers,
      answersLoaded: this.answersLoaded
    };
  }

  rehydrate(state) {
    this.answers = new Map(state.answers);
    this.answersLoaded = state.answersLoaded;
  }
}

export default AnswerStore;
