
import InitActions from "./pages/InitActions";

import HomePage from "./pages/HomePage";
import PartiesPage from "./pages/PartiesPage";
import PartyPage from "./pages/PartyPage";
import TagsPage from "./pages/TagsPage";
import TagPage from "./pages/TagPage";
import AnswerPage from "./pages/AnswerPage";
import QuestionsPage from "./pages/QuestionsPage";
import QuestionPage from "./pages/QuestionPage";
import QuizzesPage from "./pages/QuizzesPage";
import QuizPage from "./pages/QuizPage";
import UsersPage from "./pages/UsersPage";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";

export default {

  home: {
    path: "/",
    method: "get",
    handler: HomePage
  },

  parties: {
    path: "/parties",
    method: "get",
    handler: PartiesPage,
    action: InitActions.partiesPage
  },

  party: {
    path: "/parties/:name",
    method: "get",
    handler: PartyPage,
    action: InitActions.partyPage
  },

  tags: {
    path: "/tags",
    method: "get",
    handler: TagsPage,
    action: InitActions.tagsPage
  },

  tag: {
    path: "/tags/:name",
    method: "get",
    handler: TagPage,
    action: InitActions.tagPage
  },

  questions: {
    path: "/questions",
    method: "get",
    handler: QuestionsPage,
    action: InitActions.questionsPage
  },

  question: {
    path: "/questions/:title",
    method: "get",
    handler: QuestionPage,
    action: InitActions.questionPage
  },

  answer: {
    path: "/questions/:title/:name",
    method: "get",
    handler: AnswerPage,
    action: InitActions.answerPage
  },

  quizzes: {
    path: "/quizzes",
    method: "get",
    handler: QuizzesPage,
    action: InitActions.quizzesPage
  },

  quiz: {
    path: "/quizzes/:name",
    method: "get",
    handler: QuizPage,
    action: InitActions.quizPage
  },

  users: {
    path: "/users",
    method: "get",
    handler: UsersPage,
    action: InitActions.usersPage
  },

  user: {
    path: "/users/:name",
    method: "get",
    handler: UserPage,
    action: InitActions.userPage
  },

  search: {
    path: "/search/:value",
    method: "get",
    handler: SearchPage,
    action: InitActions.searchPage
  },

  // This route doesn't point to any handler.
  // I made it just as example for showing an action responding with an error
  bad: {
    path: "/bad",
    method: "get",
    action: InitActions.badPage
  }

};
