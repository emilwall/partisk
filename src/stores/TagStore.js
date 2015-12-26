import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import {Map} from "immutable";
import _ from "underscore";

class TagStore extends BaseStore {

  static storeName = "TagStore"

  static handlers = {
    [Actions.LOAD_TAGS_SUCCESS]: "handleLoadTagsSuccess",
    [Actions.LOAD_TAG_SUCCESS]: "handleLoadTagSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.tags = new Map();
    this.tagsLoaded = false;
  }

  handleLoadTagSuccess(tag) {
    this.tags = this.tags.set(tag.id, tag);
    this.emitChange();
  }

  handleLoadTagsSuccess({ tags }) {
    _.each(tags, function (tag) {
      this.tags = this.tags.set(tag.id, tag);
    }, this);

    this.tagsLoaded = true;
    this.emitChange();
  }

  getTag(id) {
    return this.tags.find(tag =>
      answer.id === id
    );
  }

  getByName(name) {
    const lowerName = name.toLowerCase();
    return this.tags.find(tag =>
      tag.name.toLowerCase() === lowerName
    );
  }

  getTags() {
    return this.tags;
  }

  isTagsLoaded() {
    return this.tagsLoaded;
  }

  isTagLoaded(name) {
    return !!this.getByName(name);
  }

  dehydrate() {
    return {
      tags: this.tags,
      tagsLoaded: this.tagsLoaded
    };
  }

  rehydrate(state) {
    this.tags = new Map(state.tags);
    this.tagsLoaded = state.tagsLoaded;
    this.emitChange();
  }
}

export default TagStore;
