import React, { PropTypes, Component } from "react";
import _ from "underscore";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import { Map } from "immutable";
import classnames from "classnames";

import {setSubPageLoading} from "../actions/AppActionCreators";
import SubPage from "../components/SubPage";

import { navigate } from "../utils/Utils";

@connectToStores(["PartiskStore"], function(context, props) {
  return ({
    parties: context.getStore("PartiskStore").getParties(),
    questions: context.getStore("PartiskStore").getQuestions()
  })
})
class PartiesPage extends Component {
  static propTypes = {
    parties: PropTypes.object.isRequired
  }

  partyClick(name) {
    navigate("party", {name: name}, this.props.context);
  }

  render () {
    const { parties } = this.props;
    const self = this;
    const totalQuestions = this.props.questions.size;

    let sortedParties = parties.sortBy(party => {
      return -Math.max(party.result.EU, party.result.parliment);
    });

    let partiesInParliment = sortedParties.filter(party => {
      return party.result.parliment >= 4 || party.result.EU >= 4;
    }).toList();

    let partiesOutsideParliment = sortedParties.filter(party => {
      return party.result.parliment < 4  && party.result.EU < 4;
    }).toList();

    let getPartiesBlock = function (parties) {
      let partiesBlock = parties.map(function(party, index) {
        const numberOfAnswers = party.getNumberOfAnswers();
        const numberOfAnsweredQuestions = party.getNumberOfAnsweredQuestions();

        let classes = {"party-logo": true};
        classes["party-logo-" + party.id] = true;
        const icon = <span className={classnames(classes)} />
        const answeredQuestions = Math.round(100*numberOfAnsweredQuestions/totalQuestions);

        return (
          <div key={party.id} className="collection-item">
            <NavLink routeName="party" navParams={{name: party.name.toLowerCase()}}>
              {icon}
              <h2 className="title">{party.name}</h2>
            </NavLink>
            <p className="stats">
              <strong>{numberOfAnswers}</strong> answers, <strong>{answeredQuestions}%</strong> questions answered
            </p>
            <p className="stats">
              EU <strong>{Math.round(party.result.EU*10)/10}%</strong>, Parliment <strong>{Math.round(party.result.parliment*10)/10}%</strong>
            </p>
          </div>
        );
      }).toArray();

      return (
        <div className="collection parties-expose">
          {partiesBlock}
        </div>
      );
    };

    return (
      <div>
        <h1>Parties</h1>
        {getPartiesBlock(partiesInParliment)}
        <div className="party-separator">
          <div className="separator">
            <span>Local/EU parliment threshold</span>
          </div>
        </div>
        {getPartiesBlock(partiesOutsideParliment)}
      </div>
    );
  }
}

export default PartiesPage;
