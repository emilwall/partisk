import React, { PropTypes, Component } from "react";
import classnames from "classnames";
import Link from "./Link";
import _ from "underscore";
import { encodeURL } from "../utils/Utils";

class SearchResults extends Component {
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

export default SearchResults;
