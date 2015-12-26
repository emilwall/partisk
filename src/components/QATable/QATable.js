import React, { PropTypes, Component } from "react";
import ReactList from "react-list";
import { findDOMNode } from "react-dom";
import { NavLink } from "fluxible-router";
import classnames from "classnames";
import { encodeURL } from "../../utils/Utils";
import { Map } from "immutable";
import { starQuestion } from "../../actions/QuestionActionCreators";

class Header extends Component {
  static propTypes = {
    parties: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.parties !== this.props.parties;
  }

  render() {
    let { parties } = this.props;
    let partiesList = parties.map(function (party, partyId) {
      let classes = {"party-logo-small": true};
      classes["party-logo-small-" + party.id] = true;

      return <NavLink className="cell" key={partyId} routeName="party" navParams={{name: encodeURL(party.name)}}>
        <span className={classnames(classes)} />
      </NavLink>;
    }).toArray();

    let style = {
      display: this.props.visible ? "block" : "none"
    };

    return (
      <div style={style}>
        <div className="header-background" />
        <div className="row header">
          <div className="cell empty" />
          <div className="cell header"></div>
          {partiesList}
        </div>
      </div>
    );
  }
}

class Row extends Component {
  static propTypes = {
    parties: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
  }

  static contextTypes = {
     executeAction: PropTypes.func.isRequired
  }

  static defaultProps = {
      visible: true
  };

  constructor (props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.question !== this.props.question ||
      nextProps.parties !== this.props.parties ||
      nextProps.visible !== this.props.visible;
  }

  starQuestion () {
    this.context.executeAction(starQuestion, {id: this.props.question.id, starred: !this.props.question.starred});
  }

  render() {
    let { parties, question, visible } = this.props;
    let answersList = parties.map(function (party) {
      if (question.answers.has(party.id)) {
        let answer = question.answers.get(party.id);

        let classes = {
          cell: true
        };

        classes[answer.answer === "ja" ? "yes" : "no"] = true;

        return <NavLink className={classnames(classes)} key={answer.id} routeName="answer"
          navParams={{name: encodeURL(party.name), title: encodeURL(question.title)}}>
          {answer.answer}
        </NavLink>
      } else {
        return <span className="cell" key={question.id + "," + party.id}></span>;
      }
    }).toArray();

    let style = visible ? {} : {display: "none"};
    return (
      <div className="row" style={style}>
        <i onClick={this.starQuestion.bind(this)} className={classnames("el", question.starred ? "el-star" : "el-star-empty")}></i>
        <NavLink className="cell header" routeName="question" navParams={{title: encodeURL(question.title)}}>
          {question.title}
        </NavLink>
        {answersList}
      </div>
    );
  }
}

class QATable extends Component {
  static propTypes = {
    questions: PropTypes.object.isRequired,
    answers: PropTypes.object.isRequired,
    parties: PropTypes.object.isRequired
  }

  static defaultProps = {
    showHeader: true
  }

  constructor (props) {
    super(props);

    this.state = {
      showFixedHeader: false
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(e) {
    let headerDOM = findDOMNode(this.refs.header);
    const showFixedHeader = window.scrollY >= headerDOM.offsetTop;

    if (showFixedHeader !== this.state.showFixedHeader) {
      this.setState({showFixedHeader: showFixedHeader});
    }
  }

  componentDidMount() {
    if (this.props.showHeader) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (this.props.showHeader) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  shouldComponentUpdate(newProps, newState) {
    return newProps !== this.props || newState !== this.state;
  }

  render() {
    let { answers, questions, parties, showHeader } = this.props;
    let { showFixedHeader } = this.state;

    let sortedParties = parties.sortBy(party => {
      return -Math.max(party.result.EU, party.result.parliment);
    }).toList();

    let questionsData = questions.sortBy(question => question.starred ? "0" : "1" + question.title)
      .filter(function (question) {
        return parties.some(function (party) {
          return question.answers.has(party.id);
        });
      }).toList();

    let renderRow = function (index, key) {
      const question = questionsData.get(index);
      return <Row parties={sortedParties} key={question.id} question={question} visible={true} />;
    };

    let sizeGetter = function (index) {
      return 51;
    };

    let fixedHeader = showHeader ? (
      <div className="qa-table fixed-header">
        <Header parties={sortedParties} visible={showFixedHeader} ref="fixedHeader" />
      </div>
    ) : null;

    let header = showHeader ? (
      <div className="qa-table">
        <Header parties={sortedParties} ref="header" visible={true} />
      </div>
    ) : null;

    return (
      <div className="qa-table-container">
        {fixedHeader}
        {header}
        <div className="qa-table">
          <ReactList
            itemRenderer={renderRow}
            itemSizeGetter={sizeGetter}
            length={questionsData.size}
            type='variable' />
        </div>
      </div>
    );
  }
}

export default QATable;
