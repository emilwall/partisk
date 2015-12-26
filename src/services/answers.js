import { getAnswers } from "../utils/APIUtils";

export default {
  name: "answers",

  read(req, resource, {}, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getAnswers(query, options, done);
  }
};
