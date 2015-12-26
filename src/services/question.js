import { getQuestion } from "../utils/APIUtils";

// Fetchr service to load a photo given an id.

export default {
  name: "question",

  read(req, resource, { title }, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getQuestion(title, options, done);
  }

};
