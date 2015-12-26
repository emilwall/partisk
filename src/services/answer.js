import { getAnswer } from "../utils/APIUtils";

// Fetchr service to load a photo given an id.

export default {
  name: "answer",

  read(req, resource, { questionId, partyId }, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getAnswer(questionId, partyId, options, done);
  }

};
