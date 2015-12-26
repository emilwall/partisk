import {Record, Map} from "immutable";

class Tag extends Record({
  id: "id",
  name: "name",
  isCategory: false
}) {}

Tag.fromData = function (data) {
  return new Tag({
    id: data.id,
    name: data.name,
    isCategory: data.is_category
  });
};

export default Tag;
