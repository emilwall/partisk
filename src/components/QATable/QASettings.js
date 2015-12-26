import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";
import classnames from "classnames";

@connectToStores(["PartiskStore", "AppStore"], function(context, props) {
  return ({
    parties: context.getStore("PartiskStore").getParties(),
    enabledParties: context.getStore("AppStore").getEnabledParties()
  })
})
class QASettings extends Component {
  static propTypes = {
    visible: PropTypes.bool
  }

  static defaultProps = {
    visible: false
  }

  constructor() {
    super();

    this.togglePartyClick = this.togglePartyClick.bind(this);
  }

  togglePartyClick(partyId) {
    const self = this;
    const enabled = !this.props.enabledParties.get(partyId);

    return function () {
      self.props.context.getStore("AppStore").setEnabledParty(partyId, enabled);
    };
  }

  render() {
    const { parties, enabledParties } = this.props;

    const partiesList = parties.map(function (party) {
      const classes = classnames({
        enabled: !enabledParties.get(party.id)
      });

      return <li className={classes} onClick={this.togglePartyClick(party.id)} key={party.id}>{party.name}</li>;
    }, this).toArray();

    return (
      <div id="settings">
        <div>
          <h3>Parties</h3>
          <ul>
            {partiesList}
          </ul>
        </div>
        <div>
          <h3>Sorting</h3>
          <ul>
            {partiesList}
          </ul>
        </div>
      </div>
    );
  }
}

export default QASettings;
