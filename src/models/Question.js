import {Record, Map} from "immutable";

class Question extends Record({
  id: "id",
  title: "title",
  description: "description",
  answers: new Map(),
  tagIds: [],
  starred: false,
  tags: new Map()
}) {}

Question.prototype.addAnswer = function (answer) {
  return this.set("answers", this.answers.set(answer.partyId, answer));
};

Question.prototype.addTag = function (tag) {
  return this.set("tags", this.tags.set(tag.id, tag));
};

Question.fromData = function (data) {
  return new Question({
    id: data.id,
    title: data.title,
    description: data.description,
    tagIds: data.tagIds,
    starred: false
  });
};

export default Question;
