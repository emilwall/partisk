import React from "react";
import { FormattedMessage } from "../utils/IntlComponents";

import SubPage from "../components/SubPage";

class NotFoundPage extends React.Component {

  render() {
    return (
      <div>
        <FormattedMessage message="meta.notFoundTitle" />
      </div>
    );
  }

}

export default NotFoundPage;
