import { getTag } from "../utils/APIUtils";

// Fetchr service to load a photo given an id.

export default {
  name: "tag",

  read(req, resource, { name }, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getTag(name, options, done);
  }

};
