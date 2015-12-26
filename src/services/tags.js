import { getTags } from "../utils/APIUtils";

export default {
  name: "tags",

  read(req, resource, {}, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getTags(query, options, done);
  }
};
