import { getQuiz } from "../utils/APIUtils";

// Fetchr service to load a photo given an id.

export default {
  name: "quiz",

  read(req, resource, { name }, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getQuiz(id, options, done);
  }

};
