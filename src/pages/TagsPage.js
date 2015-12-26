import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import _ from "underscore";
import {Map} from "immutable";
import { encodeURL } from "../utils/Utils";
import ReactList from "react-list";

import SubPage from "../components/SubPage";

@connectToStores(["PartiskStore"], (context, props) =>
  ({ tags: context.getStore("PartiskStore").getTags() })
)
class TagsPage extends Component {

  static propTypes = {
    tags: PropTypes.object.isRequired
  }

  static contextTypes = {
     getStore: PropTypes.func.isRequired
  }

  render() {
    const { tags } = this.props;
    const PartiskStore = this.context.getStore("PartiskStore");
    var self = this;

    const tagsData = tags.sortBy(tag => tag.name).toList();

    const renderRow = function (index, key) {
      const tag = tagsData.get(index);
      const questions = PartiskStore.getQuestionsForTag(tag.id);
      return <NavLink key={tag.id} className="collection-item" routeName="tag" navParams={{name: tag.name}}>
        {tag.name} {questions ? questions.size : 0}
      </NavLink>;
    };

    var sizeGetter = function (index) {
      return 48;
    };

    return (
      <div>
        <h1>Tags</h1>
        <div className="collection">
          <ReactList
            itemRenderer={renderRow}
            itemSizeGetter={sizeGetter}
            length={tagsData.size}
            type='variable' />
        </div>
      </div>
    );
  }
}

export default TagsPage;
