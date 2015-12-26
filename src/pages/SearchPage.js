import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import {Map} from "immutable";
import _ from "underscore";
import {decodeURL, searchItem} from "../utils/Utils";

import SearchResults from "../components/SearchResults";

@connectToStores(["PartiskStore"], (context, props) =>
  ({
    value: decodeURL(props.value),
    parties: context.getStore("PartiskStore").getParties(),
    questions: context.getStore("PartiskStore").getQuestions(),
    tags: context.getStore("PartiskStore").getTags()
  })
)
class SearchPage extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired
  }

  render() {
    let { parties, questions, tags, value } = this.props;

    let search = function (option) {
      return searchItem(option, value);
    }

    let partiesResult = _.filter(parties.toArray(), search);
    let questionsResult = _.filter(questions.toArray(), search);
    let tagsResult = _.filter(tags.toArray(), search);

    return (
      <div>
        <h1>Results for "{this.props.value}"</h1>

        <SearchResults
          parties={partiesResult}
          questions={questionsResult}
          tags={tagsResult}
          hasMoreItems={false} />

      </div>
    );
  }

}

export default SearchPage;
