import { getUsers } from "../utils/APIUtils";

export default {
  name: "users",

  read(req, resource, {}, config, done) {
    const query = {};
    const options = {
      locale: req.locale
    };
    getUsers(query, options, done);
  }
};
