import React, { PropTypes, Component } from "react";
import ReactDOM from "react-dom";
import Link from "./Link";
import { connectToStores } from "fluxible-addons-react";
import { encodeURL, navigate } from "../utils/Utils";
import _ from "underscore";
import classnames from "classnames";

import Party from "../models/Party";
import Tag from "../models/Tag";
import Question from "../models/Question";

let Keys = {
  enter: 13,
  down: 40,
  up: 38
}

class ListRenderer extends Component {
  constructor(props) {
    super(props);

    this.onOptionSelected = this.onOptionSelected.bind(this);
    this.getQuestionItems = this.getQuestionItems.bind(this);
    this.getPartyItems = this.getPartyItems.bind(this);
    this.getTagItems = this.getTagItems.bind(this);
  }

  onOptionSelected (e) {
      this.props.onOptionSelected("", e);
  }

  getQuestionItems (questions, onOptionSelected) {
    let { index } = this.props;

    return _.map(questions, function (question, key) {
      let selectedClass = classnames({
        selected: key === index
      })

      return (
        <li className={selectedClass} key={question.id}>
          <Link routeName="question" navParams={{title: encodeURL(question.title)}} callback={onOptionSelected}>
          <span className="icon">
            <span className="el el-question" />
          </span>
          {question.title}
          </Link>
        </li>
      );
    });
  }

  getPartyItems (parties, onOptionSelected, itemsBefore) {
    let { index } = this.props;

    return _.map(parties, function (party, key) {
      let selectedClass = classnames({selected: parseInt(key) + itemsBefore === index});
      let classes = {"party-logo-small": true};
      classes["party-logo-small-" + party.id] = true;

      return (
        <li className={selectedClass} key={party.id}>
          <Link routeName="party" className="party" navParams={{name: encodeURL(party.name)}} callback={onOptionSelected}>
            <span className="icon">
              <span className={classnames(classes)} />
            </span>
            {party.name}
          </Link>
        </li>
      );
    });
  }

  getTagItems (tags, onOptionSelected, itemsBefore) {
    let { index } = this.props;

    return _.map(tags, function (tag, key) {
      let selectedClass = classnames({selected: parseInt(key) + itemsBefore === index});

      return (
        <li className={selectedClass} key={tag.id}>
          <Link routeName="tag" navParams={{name: encodeURL(tag.name)}} callback={onOptionSelected}>
            <span className="icon">
              <span className="el el-tag" />
            </span>
            {tag.name}
          </Link>
        </li>
      );
    });
  }

  render () {
    let { classes, tags, questions, parties, index } = this.props;
    let onOptionSelected = this.onOptionSelected;

    let numberOfQuestions = questions.length;
    let numberOfParties = parties.length;
    let numberOfTags = tags.length;

    let noItems = 0;

    let questionItems = this.getQuestionItems(questions, onOptionSelected);
    let partyItems = this.getPartyItems(parties, onOptionSelected, numberOfQuestions);
    let tagItems = this.getTagItems(tags, onOptionSelected, numberOfQuestions + numberOfParties);

    let questionsBlock = numberOfQuestions > 0 ? (
      <li>
        <div className="title">Questions</div>
        <ul>
          {questionItems}
        </ul>
      </li>
    ) : null;

    let partiesBlock = numberOfParties > 0 ? (
      <li>
        <div className="title">Parties</div>
        <ul>
          {partyItems}
        </ul>
      </li>
    ) : null;

    let tagsBlock = numberOfTags > 0 ? (
      <li>
        <div className="title">Tags</div>
        <ul>
          {tagItems}
        </ul>
      </li>
    ) : null;

    let moreClasses = classnames({
      more: true,
      selected: index === numberOfTags + numberOfParties + numberOfQuestions
    })

    let moreBlock = this.props.hasMoreItems ? (
      <li className={moreClasses}>
        <a>Show more...</a>
      </li>
    ) : null;

    return (
      <ul>
        {questionsBlock}
        {partiesBlock}
        {tagsBlock}
        {moreBlock}
      </ul>
    );
  }
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
    } else {
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

    const filterValue = value.toLowerCase();
    let filter = function (option) {
      let text = option.name || option.title;
      // TODO: SLOW
      return text.toLowerCase().indexOf(filterValue) > -1;
    };

    let filteredParties = value !== "" ? _.filter(parties.toArray(), filter) : [];
    let filteredTags = value !== "" ? _.filter(tags.toArray(), filter) : [];
    let filteredQuestions = value !== "" ? _.filter(questions.toArray(), filter) : [];

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
        <ListRenderer
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
