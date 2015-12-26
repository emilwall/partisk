import {Record, Map} from "immutable";

class Result extends Record({
  EU: "lastResultEU",
  parliment: "lastResultParliment"
}) {}

class Party extends Record({
  id: "id",
  name: "name",
  description: "description",
  website: "website",
  color: "color",
  result: new Record({EU: "lastResultEU", parliment: "lastResultParliment"}),
  shortName: "shortName",
  answers: new Map()
}) {}

Party.prototype.addAnswer = function (answer) {
  return this.set("answers", this.answers.set(answer.id, answer));
};

Party.prototype.getNumberOfAnswers = function () {
  return this.answers.size;
};

Party.prototype.getNumberOfAnsweredQuestions = function () {
    let questions = this.answers.reduce(function (questions, answer) {
        return questions.set(answer.questionId, answer);
    }, new Map(), this);

    return questions.size;
};

Party.fromData = function (data) {
  return new Party({
    id: data.id,
    name: data.name.substr(0, 1).toUpperCase() + data.name.substr(1),
    website: data.website,
    color: data.color,
    result: new Result({
      EU: data.last_result_eu,
      parliment: data.last_result_parliment}),
    description: data.description,
    shortName: data.short_name
  });
};

export default Party;
