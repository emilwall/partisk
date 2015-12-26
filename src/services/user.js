import { getUser } from "../utils/APIUtils";

// Fetchr service to load a photo given an id.

export default {
  name: "user",

  read(req, resource, { name }, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getUser(name, options, done);
  }

};
