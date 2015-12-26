import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import _ from "underscore";
import { Map } from "immutable";
import { decodeURL } from "../utils/Utils";
import SubPage from "../components/SubPage";
import TagList from "../components/TagList";
import QATable from "../components/QATable/QATable";

@connectToStores(["PartiskStore"], (context, props) =>
  ({
    questionData: context.getStore("PartiskStore").getQuestionByTitle(decodeURL(props.title)),
    partiesData: context.getStore("PartiskStore").getParties()
  })
)
class QuestionPage extends Component {

  static propTypes = {
    questionData: PropTypes.object.isRequired,
    partiesData: PropTypes.object.isRequired
  }

  render() {
    const { questionData, partiesData } = this.props;

    const questionsData = (new Map()).set(questionData.id, questionData);
    const answersData = questionData.answers;

    return (
      <div>
        <h1>{questionData.title}</h1>
        <TagList tags={questionData.tags} />
        <p>{questionData.description}</p>
        <QATable questions={questionsData} parties={partiesData}
          answers={answersData} />
      </div>
    );
  }

}

export default QuestionPage;
