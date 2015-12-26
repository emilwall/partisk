import React, { PropTypes, Component } from "react";
import _ from "underscore";
import { NavLink } from "fluxible-router";

class TagList extends Component {
  static propTypes = {
    tags: PropTypes.object.isRequired
  }

  render() {
    let { tags } = this.props;

    console.log(tags);

    let tagComponents = tags.map(function (tag) {
        return (
            <li key={tag.id}>
              <NavLink routeName="tag" navParams={{name: tag.name}}>
                {tag.name}
              </NavLink>
            </li>
        );
    });

    return (
      <ul className="tags-list">
        {tagComponents}
      </ul>
    );
  }

}

export default TagList;
