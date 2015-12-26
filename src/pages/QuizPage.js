import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { decodeURL } from "../utils/Utils";

import SubPage from "../components/SubPage";

@connectToStores(["QuizStore"], (context, props) =>
  ({ quiz: context.getStore("QuizStore").getQuizByName(decodeURL(props.name)) })
)
class QuizPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render() {
    const { quiz } = this.props;

    return (
      <div>
        <h1>{ quiz.name }</h1>
      </div>
    );
  }

}

export default QuizPage;
