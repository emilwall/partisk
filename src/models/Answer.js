import {Record} from "immutable";

class Answer extends Record({
  id: "id",
  answer: "answer",
  partyId: "partyId",
  questionId: "questionId",
  source: "source",
  date: "date",
  description: "description",
}) {}

Answer.fromData = function (data) {
  return new Answer({
    id: data.id,
    answer: data.answer,
    partyId: data.party_id,
    questionId: data.question_id,
    source: data.source,
    date: data.date,
    description: data.description
  });
};

export default Answer;
