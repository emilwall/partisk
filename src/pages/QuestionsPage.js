import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import _ from "underscore";
import classNames from "classnames";
import {Map} from "immutable";

import SubPage from "../components/SubPage";

import QATable from "../components/QATable/QATable";

@connectToStores(["PartiskStore", "AppStore"], (context, props) =>
  ({
    partiesData: context.getStore("PartiskStore").getParties(),
    questionsData: context.getStore("PartiskStore").getQuestions(),
    enabledParties: context.getStore("AppStore").getEnabledParties()
  })
)
class QuestionsPage extends Component {
  static propTypes = {
    questionsData: PropTypes.object.isRequired,
    partiesData: PropTypes.object.isRequired,
    enabledParties: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.partiesData !== nextProps.partiesData ||
      this.props.questionsData !== nextProps.questionsData ||
      this.props.enabledParties !== nextProps.enabledParties;
  }

  render() {
    const { questionsData, partiesData, enabledParties } = this.props;

    var answersData = new Map();

    questionsData.forEach(function (question) {
      question.answers.forEach(function (answer) {
          answersData = answersData.set(answer.id, answer);
      });
    });

    const parties = partiesData.filter( party => enabledParties.get(party.id));

    return (
      <div>
        <h1>Questions</h1>
        <QATable questions={questionsData} parties={parties}
          answers={answersData} />
      </div>
    );
  }
}



export default QuestionsPage;
