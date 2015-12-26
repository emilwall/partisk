import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import _ from "underscore";
import {Map, Set} from "immutable";

import Question from "../models/Question";
import Answer from "../models/Answer";
import Party from "../models/Party";
import Tag from "../models/Tag";

class PartiskStore extends BaseStore {

  static storeName = "PartiskStore"

  static handlers = {
    [Actions.LOAD_PARTY_SUCCESS]: "handlePartyDataUpdated",
    [Actions.LOAD_PARTIES_SUCCESS]: "handlePartyDataUpdated",
    [Actions.LOAD_TAG_SUCCESS]: "handleTagDataUpdated",
    [Actions.LOAD_TAGS_SUCCESS]: "handleTagDataUpdated",
    [Actions.LOAD_ANSWER_SUCCESS]: "handleAnswerDataUpdated",
    [Actions.LOAD_ANSWERS_SUCCESS]: "handleAnswerDataUpdated",
    [Actions.LOAD_USER_SUCCESS]: "handleUserDataUpdated",
    [Actions.LOAD_USERS_SUCCESS]: "handleUserDataUpdated",
    [Actions.LOAD_QUESTION_SUCCESS]: "handleQuestionDataUpdated",
    [Actions.LOAD_QUESTIONS_SUCCESS]: "handleQuestionDataUpdated",
    [Actions.QUESTION_STARRED]: "handleQuestionStarred",
    [Actions.APP_REHYDRATED]: "handleAppRehydrated"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this.questions = new Map();
    this.answers = new Map();
    this.tags = new Map();
    this.parties = new Map();
    this.quizzes = new Map();
    this.users = new Map();

    this.tagQuestions = new Map();
  }

  handlePartyDataUpdated() {
    this.dispatcher.waitFor("PartyStore", () => {
      var parties = this.dispatcher.getStore("PartyStore").getParties();
      parties.forEach(function (party) {
        this.parties = this.parties.set(party.id, Party.fromData(party));
      }, this);

      this.linkModels();
    });
  }

  handleTagDataUpdated() {
    this.dispatcher.waitFor("TagStore", () => {
      var tags = this.dispatcher.getStore("TagStore").getTags();
      tags.forEach(function (tag) {
        this.tags = this.tags.set(tag.id, Tag.fromData(tag));
      }, this);

      this.linkModels();
    });
  }

  handleQuestionDataUpdated() {
    this.dispatcher.waitFor("QuestionStore", () => {
      var questions = this.dispatcher.getStore("QuestionStore").getQuestions();
      questions.forEach(function (question) {
        this.questions = this.questions.set(question.id, Question.fromData(question));
      }, this);

      this.linkModels();
    });
  }

  handleAnswerDataUpdated() {
    this.dispatcher.waitFor("AnswerStore", () => {
      var answers = this.dispatcher.getStore("AnswerStore").getAnswers();
      answers.forEach(function (answer) {
        this.answers = this.answers.set(answer.id, Answer.fromData(answer));
      }, this);

      this.linkModels();
    });
  }

  handleQuestionStarred ({ id, starred }) {
    let question = this.questions.get(id);
    this.questions = this.questions.set(question.id, question.set("starred", starred));
    this.emitChange();
  }

  //se till att trigga actions vid hydrate! nu anropas inte linkModels för all hydrated data, trigger funkar inte...

  handleAppRehydrated() {
    this.handlePartyDataUpdated();
    this.handleQuestionDataUpdated();
    this.handleAnswerDataUpdated();
    this.handleTagDataUpdated();
  }

  linkModels() {
    if (!this.answers.isEmpty()) {
      this.answers.forEach(function (answer) {
        var question = this.questions.get(answer.questionId);
        var party = this.parties.get(answer.partyId);

        if (question) {
          this.questions = this.questions.set(answer.questionId, question.addAnswer(answer));
        }

        if (party) {
          this.parties = this.parties.set(answer.partyId, party.addAnswer(answer));
        }
      }, this);
    }

    if (!this.questions.isEmpty() && !this.tags.isEmpty()) {
      var self = this;

      this.questions = this.questions.reduce(function (questions, question) {
        return questions.set(question.id,
          question.set('tags', question.tagIds.reduce(function (tags, id) {
            const tag = self.tags.get(id);
            return tag && tags.set(id, tag) || tags;
          }, new Map(), this))
        );
      }, new Map(), this);

      this.questions.forEach(function (question) {
        question.tagIds.forEach(function (tagId) {
          const tag = this.tags.get(tagId);

          if (!this.tagQuestions.has(tagId)) {
            this.tagQuestions = this.tagQuestions.set(tagId, new Set());
          }

          this.tagQuestions = this.tagQuestions.updateIn([tagId], set => set.add(question.id));
        }, this);
      }, this);

      // Remove tags without questions
      this.tags = this.tags.filter(function (tag) {
        const questions = self.tagQuestions.get(tag.id);
        return questions && questions.size > 0;
      });

      this.applySettings();
    }
  }

  applySettings() {
    this.dispatcher.waitFor("AppStore", () => {
      var favourites = this.dispatcher.getStore("AppStore").getFavourites();
      if (favourites) {
        favourites.toKeyedSeq().forEach((value, key) => {
          let question = this.questions.get(key);
          this.questions = this.questions.set(key, question.set("starred", true));
        });
      }
    });
  }

  getQuestions() {
    return this.questions;
  }

  getQuestion(id) {
    return this.questions.get(id);
  }

  getQuestionByTitle(title) {
    const lowerTitle = title.toLowerCase();
    return this.questions.find(function (question) {
      return question.title.toLowerCase() === lowerTitle;
    });
  }

  getQuestionsForParty(id) {
    var party = this.parties.get(id);

    return party && party.answers.reduce(function (reduction, answer, key) {
      var question = this.questions.get(answer.questionId);

      if (question) {
        return reduction.set(answer.questionId, question);
      }

      return reduction;
    }, new Map(), this);
  }

  getQuestionsForTag(id) {
    const questions = this.tagQuestions.get(id);
    return questions && questions.map(function (questionId) {
      return this.questions.get(questionId);
    }, this);
  }

  getParties() {
    return this.parties;
  }

  getParty(id) {
    return this.parties.get(id);
  }

  getPartyByName(name) {
    const lowerName = name.toLowerCase();
    return this.parties.find(function (party) {
      return party.name.toLowerCase() === lowerName;
    });
  }

  getTags() {
    return this.tags;
  }

  getTag(id) {
    return this.tags.get(id);
  }

  getTagByName(name) {
    const lowerName = name.toLowerCase();
    return this.tags.find(function (tag) {
      return tag.name.toLowerCase() === lowerName;
    });
  }

  getAnswers() {
    return this.answers;
  }

  getAnswer(id) {
    return this.answers.get(id);
  }
}

export default PartiskStore;
