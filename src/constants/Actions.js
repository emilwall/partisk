import keyMirror from "keymirror";

const Actions = keyMirror({
  SET_LOADING: null,
  SET_SUB_PAGE_LOADING: null,

  LOAD_PARTIES_SUCCESS: null,
  LOAD_PARTY_SUCCESS: null,

  LOAD_TAGS_SUCCESS: null,
  LOAD_TAG_SUCCESS: null,

  LOAD_QUIZZES_SUCCESS: null,
  LOAD_QUIZ_SUCCESS: null,

  LOAD_QUESTIONS_SUCCESS: null,
  LOAD_QUESTION_SUCCESS: null,

  LOAD_ANSWERS_SUCCESS: null,
  LOAD_ANSWER_SUCCESS: null,

  LOAD_USERS_SUCCESS: null,
  LOAD_USER_SUCCESS: null,

  LOAD_SETTINGS_SUCCESS: null,

  LOAD_INTL_SERVER: null,

  APP_REHYDRATED: null,

  QUESTION_STARRED: null,

  // fluxible-router actions
  NAVIGATE_START: null,
  NAVIGATE_SUCCESS: null,
  NAVIGATE_FAILURE: null,
  CHANGE_ROUTE: null,
  NAVIGATE: null,

  NAVIGATE_LINK_CLICK: null,
});


export default Actions;
