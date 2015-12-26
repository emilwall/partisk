import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import _ from "underscore";
import { Map } from "immutable";
import { decodeURL } from "../utils/Utils";

import SubPage from "../components/SubPage";

import QATable from "../components/QATable/QATable";

@connectToStores(["PartiskStore"], function (context, props) {
  const tag = context.getStore("PartiskStore").getTagByName(decodeURL(props.name));
  return {
    tag: tag,
    questions: context.getStore("PartiskStore").getQuestionsForTag(tag.id),
    parties: context.getStore("PartiskStore").getParties()
  };
})
class TagPage extends Component {

  static propTypes = {
    tag: PropTypes.object.isRequired
  }

  render() {
    const { tag, questions, parties } = this.props;

    console.log(questions);
    const answers = questions.reduce(function (reduction, question, key) {
      return reduction.merge(question.answers);
    }, new Map(), this);

    return (
      <div>
        <h1>{ tag.name }</h1>
        <QATable parties={parties} answers={answers} questions={questions} />
      </div>
    );
  }

}

export default TagPage;
