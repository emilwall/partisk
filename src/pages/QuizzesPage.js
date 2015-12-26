import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";
import _ from "underscore";
import { encodeURL } from "../utils/Utils";

import SubPage from "../components/SubPage";

@connectToStores(["QuizStore"], (context, props) =>
  ({ quizzes: context.getStore("QuizStore").getQuizzes() })
)
class QuizzesPage extends Component {

  static propTypes = {
    quizzes: PropTypes.object.isRequired
  }

  render() {
    const { quizzes } = this.props;

    const quizzesList = _.map(quizzes, (quiz, key) =>
      <li key={key}>
        <NavLink routeName="quiz" navParams={{id: encodeURL(quiz.name)}}>
          {quiz.name}
        </NavLink>
      </li>
    );

    return (
      <div>
        <h1>Quizzes</h1>
        <ul>
          {quizzesList}
        </ul>
      </div>
    );
  }
}

export default QuizzesPage;
