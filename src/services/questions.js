import { getQuestions } from "../utils/APIUtils";

export default {
  name: "questions",

  read(req, resource, {}, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getQuestions(query, options, done);
  }
};
