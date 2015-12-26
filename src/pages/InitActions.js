// Actions to run when the router matches a route. Used in app/routes.js

import { decodeURL } from "../utils/Utils";

import { loadParties, loadParty } from "../actions/PartyActionCreators";
import { loadQuestions, loadQuestion } from "../actions/QuestionActionCreators";
import { loadAnswers, loadAnswer } from "../actions/AnswerActionCreators";
import { loadTags, loadTag } from "../actions/TagActionCreators";

const InitActions = {
  partiesPage(context, route, done) {
    let partiesLoaded = false, answersLoaded = false;

    const partiesPageLoaded = function () {
      if (partiesLoaded && answersLoaded) {
        done();
      }
    };

    if (!context.getStore("AnswerStore").isAnswersLoaded()) {
      context.executeAction(loadAnswers, {}, function () {
        answersLoaded = true;
        partiesPageLoaded();
      });
    } else {
      answersLoaded = true;
    }

    if (!context.getStore("PartyStore").isPartiesLoaded()) {
      context.executeAction(loadParties, {}, function () {
        partiesLoaded = true;
        partiesPageLoaded();
      });
    } else {
      partiesLoaded = true;
    }

    partiesPageLoaded();
  },

  partyPage(context, route, done) {
    const name = decodeURL(route.getIn(["params", "name"]));
    let partyLoaded = false, questionsLoaded = false, answersLoaded = false;

    const partyPageLoaded = function () {
        if (partyLoaded && questionsLoaded && answersLoaded) {
          done();
        }
    };

    if (!context.getStore("PartyStore").isPartyLoaded(name)) {
      context.executeAction(loadParty, { name }, function () {
        partyLoaded = true;
        partyPageLoaded();
      });
    } else {
      partyLoaded = true;
    }

    if (!context.getStore("QuestionStore").isQuestionsLoaded()) {
      context.executeAction(loadQuestions, {}, function () {
        questionsLoaded = true;
        partyPageLoaded();
      });
    } else {
      questionsLoaded = true;
    }

    if (!context.getStore("AnswerStore").isAnswersLoaded()) {
      context.executeAction(loadAnswers, {}, function () {
        answersLoaded = true;
        partyPageLoaded();
      });
    } else {
      answersLoaded = true;
    }

    partyPageLoaded();
  },

  tagsPage(context, route, done) {
    let tagsLoaded = false, questionsLoaded = false;

    const tagsPageLoaded = function () {
        if (tagsLoaded && questionsLoaded) {
          done();
        }
    };

    if (!context.getStore("TagStore").isTagsLoaded()) {
      context.executeAction(loadTags, {}, function () {
        tagsLoaded = true;
        tagsPageLoaded();
      });
    } else {
      tagsLoaded = true;
    }

    if (!context.getStore("QuestionStore").isQuestionsLoaded()) {
      context.executeAction(loadQuestions, {}, function () {
        questionsLoaded = true;
        tagsPageLoaded();
      });
    } else {
      questionsLoaded = true;
    }

    tagsPageLoaded();
  },

  tagPage(context, route, done) {
    const name = decodeURL(route.getIn(["params", "name"]));
    let partiesLoaded = false, questionsLoaded = false, answersLoaded = false, tagLoaded = false;

    const tagPageLoaded = function () {
        if (partiesLoaded && questionsLoaded && answersLoaded && tagLoaded) {
          done();
        }
    };

    if (!context.getStore("TagStore").isTagLoaded(name)) {
      context.executeAction(loadTag, { name }, function () {
        tagLoaded = true;
        tagPageLoaded();
      });
    } else {
      tagLoaded = true;
    }

    if (!context.getStore("PartyStore").isPartiesLoaded()) {
      context.executeAction(loadParties, {}, function () {
        partiesLoaded = true;
        tagPageLoaded();
      });
    } else {
      partiesLoaded = true;
    }

    if (!context.getStore("QuestionStore").isQuestionsLoaded()) {
      context.executeAction(loadQuestions, {}, function () {
        questionsLoaded = true;
        tagPageLoaded();
      });
    } else {
      questionsLoaded = true;
    }

    if (!context.getStore("AnswerStore").isAnswersLoaded()) {
      context.executeAction(loadAnswers, {}, function () {
        answersLoaded = true;
        tagPageLoaded();
      });
    } else {
      answersLoaded = true;
    }

    tagPageLoaded();
  },

  questionsPage(context, route, done) {
    let partiesLoaded = false, questionsLoaded = false, answersLoaded = false;

    const questionsPageLoaded = function () {
        if (partiesLoaded && questionsLoaded && answersLoaded) {
          done();
        }
    };

    if (!context.getStore("PartyStore").isPartiesLoaded()) {
      context.executeAction(loadParties, {}, function () {
        partiesLoaded = true;
        questionsPageLoaded();
      });
    } else {
      partiesLoaded = true;
    }

    if (!context.getStore("QuestionStore").isQuestionsLoaded()) {
      context.executeAction(loadQuestions, {}, function () {
        questionsLoaded = true;
        questionsPageLoaded();
      });
    } else {
      questionsLoaded = true;
    }

    if (!context.getStore("AnswerStore").isAnswersLoaded()) {
      context.executeAction(loadAnswers, {}, function () {
        answersLoaded = true;
        questionsPageLoaded();
      });
    } else {
      answersLoaded = true;
    }

    questionsPageLoaded();
  },

  questionPage(context, route, done) {
    const title = decodeURL(route.getIn(["params", "title"]));
    let partiesLoaded = false, questionLoaded = false, answersLoaded = false;

    const questionPageLoaded = function () {
        if (partiesLoaded && questionLoaded && answersLoaded) {
          done();
        }
    };

    if (!context.getStore("PartyStore").isPartiesLoaded()) {
      context.executeAction(loadParties, {}, function () {
        partiesLoaded = true;
        questionPageLoaded();
      });
    } else {
      partiesLoaded = true;
    }

    if (!context.getStore("QuestionStore").isQuestionLoaded(title)) {
      context.executeAction(loadQuestion, { title }, function () {
        questionLoaded = true;
        questionPageLoaded();
      });
    } else {
      questionLoaded = true;
    }

    if (!context.getStore("AnswerStore").isAnswersLoaded()) {
      context.executeAction(loadAnswers, {}, function () {
        answersLoaded = true;
        questionPageLoaded();
      });
    } else {
      answersLoaded = true;
    }

    questionPageLoaded();
  },

  answerPage(context, route, done) {
    const title = decodeURL(route.getIn(["params", "title"]));
    const name = decodeURL(route.getIn(["params", "name"]));

    let partyLoaded = false, questionLoaded = false;

    const questionAndPartyLoaded = function () {
        if (partyLoaded && questionLoaded) {
          var questionId = context.getStore("QuestionStore").getByTitle(title).id;
          var partyId = context.getStore("PartyStore").getByName(name).id;

          if (!context.getStore("AnswerStore").isQuestionAnswerLoaded(questionId, partyId)) {
            context.executeAction(loadAnswer, { questionId, partyId }, function () {
              done();
            });
          } else {
            done();
          }
        }
    };

    if (!context.getStore("PartyStore").isPartyLoaded(name)) {
      context.executeAction(loadParty, { name }, function () {
        partyLoaded = true;
        questionAndPartyLoaded();
      });
    } else {
      partyLoaded = true;
    }

    if (!context.getStore("QuestionStore").isQuestionLoaded(title)) {
      context.executeAction(loadQuestion, { title }, function () {
        questionLoaded = true;
        questionAndPartyLoaded();
      });
    } else {
      questionLoaded = true;
    }

    questionAndPartyLoaded();
  },

  searchPage (context, route, done) {
    let partiesLoaded = false, questionsLoaded = false, tagsLoaded = false;

    const searchPageLoaded = function () {
        if (partiesLoaded && questionsLoaded && tagsLoaded) {
          done();
        }
    };

    if (!context.getStore("PartyStore").isPartiesLoaded()) {
      context.executeAction(loadParties, {}, function () {
        partiesLoaded = true;
        searchPageLoaded();
      });
    } else {
      partiesLoaded = true;
    }

    if (!context.getStore("QuestionStore").isQuestionsLoaded()) {
      context.executeAction(loadQuestions, {}, function () {
        questionsLoaded = true;
        searchPageLoaded();
      });
    } else {
      questionsLoaded = true;
    }

    if (!context.getStore("TagStore").isTagsLoaded()) {
      context.executeAction(loadTags, {}, function () {
        tagsLoaded = true;
        searchPageLoaded();
      });
    } else {
      tagsLoaded = true;
    }

    searchPageLoaded();
  },

  // do not load something, just send an error in the callback
  // to show how the app react with errors
  badPage(context, route, done) {
    const err = new Error();
    err.message = "Do not worry, just giving a try.";
    done(err);
  }

};

export default InitActions;
