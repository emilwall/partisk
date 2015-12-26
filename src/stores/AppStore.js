import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import { Map } from "immutable";
import _ from "underscore";
import { writeCookie } from "../utils/CookieUtils";

class AppStore extends BaseStore {

  static storeName = "AppStore"

  static handlers = {
    [Actions.SET_LOADING]: "handleSetLoading",
    [Actions.LOAD_SETTINGS_SUCCESS]: "handleSettingsLoaded",
    [Actions.QUESTION_STARRED]: "handleQuestionStarred",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.isLoading = true;
    this.isSubPageLoading = false;
    this.enabledParties = new Map();
    this.favourites = new Map();
    this.showSearchBar = false;
  }

  setEnabledParty(partyId, enabled) {
    this.enabledParties = this.enabledParties.set(partyId, enabled);
    this.saveEnabledPartiesSettings();
    this.emitChange();
  }

  getShowSearchBar() {
    return this.showSearchBar;
  }

  setShowSearchBar(value) {
    this.showSearchBar = value;
    this.emitChange();
  }

  getEnabledParties() {
    return this.enabledParties;
  }

  getFavourites() {
    return this.favourites;
  }

  showLoadingPage() {
    return this.isLoading;
  }

  handleSetLoading(loading) {
    this.isLoading = loading;
    this.emitChange();
  }

  handleSettingsLoaded(settings) {
    this.enabledParties = settings.enabledParties;
    this.favourites = settings.favourites;
    this.emitChange();
  }

  handleQuestionStarred (data) {
    if (data.starred) {
      this.favourites = this.favourites.set(data.id, true);
    } else {
      this.favourites = this.favourites.delete(data.id);
    }

    this.saveFavouritesSettings();
    this.emitChange();
  }

  saveEnabledPartiesSettings() {
    const data = this.enabledParties.toObject();
    const cookie = encodeURIComponent(JSON.stringify(data));

    writeCookie('enabledParties', "j:" + cookie, 100);
  }

  saveFavouritesSettings() {
    const data = this.favourites.toObject();
    const cookie = encodeURIComponent(JSON.stringify(data));

    writeCookie('favourites', "j:" + cookie, 100);
  }

  dehydrate() {
    console.log("dehydrate", this.enabledParties, this.favourites);
    return {
      enabledParties: this.enabledParties,
      favourites: this.favourites
    };
  }

  rehydrate(state) {
    console.log("rehydrate", state);
    this.enabledParties = new Map(state.enabledParties);
    this.favourites = new Map(state.favourites);
  }
}

export default AppStore;
