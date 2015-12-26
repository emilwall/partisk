import React, { PropTypes, Component } from "react";
import ReactDOM from "react-dom";
import Link from "./Link";
import { connectToStores } from "fluxible-addons-react";
import { encodeURL, navigate, searchItem } from "../utils/Utils";
import _ from "underscore";
import classnames from "classnames";

import Party from "../models/Party";
import Tag from "../models/Tag";
import Question from "../models/Question";

import SearchResults from "../components/SearchResults";

let Keys = {
  enter: 13,
  down: 40,
  up: 38
}

@connectToStores(["PartiskStore"], function(context, props) {
  return ({
    parties: context.getStore("PartiskStore").getParties(),
    questions: context.getStore("PartiskStore").getQuestions(),
    tags: context.getStore("PartiskStore").getTags()
  })
})
class SearchBar extends Component {
  static contextTypes = {
     executeAction: PropTypes.func.isRequired,
     getStore: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      focused: true,
      index: 0,
      tagResults: [],
      questionsResult: [],
      partiesResult: [],
      hasMoreItems: false
    };

    this.selectItem = this.selectItem.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.navigateToSearchPage = this.navigateToSearchPage.bind(this);
    this.navigateToSelectedItem = this.navigateToSelectedItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFocus () {
    this.setState({focused: true});
  }

  navigateToSearchPage () {
    navigate("search", {value: encodeURL(this.state.value)}, this.context);
  }

  navigateToSelectedItem () {
    let items = this.state.questionsResult.concat(this.state.partiesResult).concat(this.state.tagsResult);
    let selectedItem = items[this.state.index];

    this.setState({value: ""});

    if (selectedItem instanceof Question) {
      navigate("question", {title: encodeURL(selectedItem.title)}, this.context);
    } else if (selectedItem instanceof Party) {
      console.log(selectedItem, encodeURL(selectedItem.name));
      navigate("party", {name: encodeURL(selectedItem.name)}, this.context);
    } else if (selectedItem instanceof Tag) {
      navigate("tag", {name: encodeURL(selectedItem.name)}, this.context);
    } else if (this.state.value !== "") {
      this.navigateToSearchPage();
    }
  }

  onKeyDown (event) {
    let {numberOfItems, hasMoreItems} = this.state;
    let index = this.state.index;

    let upButtonPressed = event => {
      if (index > -1) {
        this.setState({index: index > -1 ? index - 1 : -1});
      }

      event.preventDefault();
    };

    let downButtonPressed = event => {
      // Make sure index can't go outside the items, or to the "More results" if that exists
      if (index < numberOfItems - 1 * (hasMoreItems ? 0 : 1)) {
        this.setState({index: index + 1});
      }

      event.preventDefault();
    };

    let enterButtonPressed = event => {
      if (index === -1) {
        this.navigateToSearchPage();
        this.setState({value: ""});
      } else {
        this.navigateToSelectedItem();
      }

      event.preventDefault();
    }

    switch (event.which) {
      case Keys.up:
        upButtonPressed(event);
        break;
      case Keys.down:
        downButtonPressed(event);
        break;
      case Keys.enter:
        enterButtonPressed(event);
        break;
      default:
        break;
    }
  }

  onBlur () {
    this.setState({focused: true});
  }

  selectItem() {
    this.setState({value: ""});
  }

  handleChange(event) {
    let { parties, questions, tags } = this.props;
    const value = event.target.value;
    const maxHits = 5;

    let search = function (option) {
      return searchItem(option, value);
    }

    let filteredParties = value !== "" ? _.filter(parties.toArray(), search) : [];
    let filteredTags = value !== "" ? _.filter(tags.toArray(), search) : [];
    let filteredQuestions = value !== "" ? _.filter(questions.toArray(), search) : [];

    const numberOfFilteredParties = filteredParties.length;
    const numberOfFilteredTags = filteredTags.length;
    const numberOfFilteredQuestions = filteredQuestions.length;

    const hasMoreItems = numberOfFilteredParties > maxHits || numberOfFilteredTags > maxHits || numberOfFilteredQuestions > maxHits;

    let tagsResult = _.first(filteredTags, maxHits);
    let partiesResult = _.first(filteredParties, maxHits);
    let questionsResult = _.first(filteredQuestions, maxHits);

    this.setState({
      value: value,
      index: -1,
      tagsResult: tagsResult,
      partiesResult: partiesResult,
      questionsResult: questionsResult,
      hasMoreItems: hasMoreItems,
      numberOfItems: numberOfFilteredParties + numberOfFilteredTags + numberOfFilteredQuestions
    });
  }

  render() {
    const value = this.state.value;
    let { questionsResult, tagsResult, partiesResult, hasMoreItems } = this.state;

    let results = value.length > 0 && this.state.focused ? (
      <ul>
        <SearchResults
          onOptionSelected={this.selectItem}
          parties={partiesResult}
          questions={questionsResult}
          tags={tagsResult}
          hasMoreItems={hasMoreItems}
          index={this.state.index} />
      </ul>
    ) : null;

    let classes = classnames({focused: this.state.focused});

    return (
      <div id="search-bar" className={classes}>
        <i className="el el-search-alt"></i>
          <div className="typeahead">
            <input type="text" ref="typeahead" value={value} onChange={this.handleChange}
              onFocus={this.onFocus} onBlur={this.onBlur} onKeyDown={this.onKeyDown} />
            {results}
          </div>
      </div>
    );
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.typeahead).focus();
  }
}

export default SearchBar;
