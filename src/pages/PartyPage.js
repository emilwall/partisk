import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import _ from "underscore";
import classnames from "classnames";
import { Map } from "immutable";
import { decodeURL } from "../utils/Utils";

import QATable from "../components/QATable/QATable";

import SubPage from "../components/SubPage";

@connectToStores(["PartiskStore"], function (context, props) {
    const party = context.getStore("PartiskStore").getPartyByName(decodeURL(props.name));

    return {
      party: party,
      questions: context.getStore("PartiskStore").getQuestionsForParty(party.id),
    };
})
class PartyPage extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    const { party, questions } = this.props;

    const parties = (new Map()).set(party.id, party);
    const answers = party.answers;
    let classes = {'party-logo': true};
    classes['party-logo-' + party.id] = true;

    return (
      <div>
        <h1><div className={classnames(classes)} />{ party.name }</h1>
        <p>{party.description}</p>
        <a href={party.website}>{party.website}</a>
        <QATable parties={parties} answers={answers} questions={questions} showHeader={false} />
      </div>
    );
  }

}

export default PartyPage;
