import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import {Map} from "immutable";
import {decodeURL} from "../utils/Utils";

@connectToStores(["PartiskStore"], (context, props) =>
  ({
    value: decodeURL(props.value)
  })
)
class SearchPage extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired
  }

  render() {

    return (
      <div>
        <h1>Results for "{this.props.value}"</h1>
      </div>
    );
  }

}

export default SearchPage;
