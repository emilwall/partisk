import { getParty } from "../utils/APIUtils";

// Fetchr service to load a photo given an id.

export default {
  name: "party",

  read(req, resource, { name }, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getParty(name, options, done);
  }

};
