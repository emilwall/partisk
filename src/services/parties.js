import { getParties } from "../utils/APIUtils";

export default {
  name: "parties",

  read(req, resource, {}, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getParties(query, options, done);
  }
};
