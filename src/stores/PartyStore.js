import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import {Map} from "immutable";
import _ from "underscore";

class PartyStore extends BaseStore {

  static storeName = "PartyStore"

  static handlers = {
    [Actions.LOAD_PARTIES_SUCCESS]: "handleLoadPartiesSuccess",
    [Actions.LOAD_PARTY_SUCCESS]: "handleLoadPartySuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.parties = new Map();
    this.partiesLoaded = false;
  }

  handleLoadPartySuccess(party) {
    this.parties = this.parties.set(party.id, party);
    this.emitChange();
  }

  handleLoadPartiesSuccess({ parties }) {
    _.each(parties, function (party) {
      this.parties = this.parties.set(party.id, party);
    }, this);

    this.partiesLoaded = true;
    this.emitChange();
  }

  getParty(id) {
    return this.parties.find(party =>
      party.id == id
    );
  }

  getParties() {
    return this.parties;
  }

  getByName(name) {
    const lowerName = name.toLowerCase();
    return this.parties.find(function (party) {
        return party.name.toLowerCase() === lowerName;
    });
  }

  isPartiesLoaded() {
    return this.partiesLoaded;
  }

  isPartyLoaded(name) {
    return !!this.getByName(name);
  }

  dehydrate() {
    return {
      parties: this.parties,
      partiesLoaded: this.partiesLoaded
    };
  }

  rehydrate(state) {
    this.parties = new Map(state.parties);
    this.partiesLoaded = state.partiesLoaded;
  }
}

export default PartyStore;
