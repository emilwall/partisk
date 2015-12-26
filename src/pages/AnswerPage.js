import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import {Map} from "immutable";
import {decodeURL} from "../utils/Utils";

import SubPage from "../components/SubPage";

import QATable from "../components/QATable/QATable";

@connectToStores(["PartiskStore"], (context, props) =>
  ({
    question: context.getStore("PartiskStore").getQuestionByTitle(decodeURL(props.title)),
    party: context.getStore("PartiskStore").getPartyByName(decodeURL(props.name))
  })
)
class AnswerPage extends Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    party: PropTypes.object.isRequired
  }

  render() {
    let { question, party } = this.props;

    let answer = question.answers.get(party.id);
    let questionsData = (new Map()).set(question.id, question);
    let partiesData = (new Map()).set(party.id, party);
    let answersData = (new Map()).set(party.id, answer);

    return (
      <div>
        <h1>{question.title}</h1>
        <p>{answer.description}</p>
        <p>{answer.source}</p>
        <QATable questions={questionsData} parties={partiesData}
          answers={answersData} />
      </div>
    );
  }

}

export default AnswerPage;
