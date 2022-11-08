/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { AppProps } from '@poozle/edk';
import SearchAssignedPR from 'commands/assigned_pr';
import CreateIssue from 'commands/create_issue';
import CreatePr from 'commands/create_pr';
import SearchReviewPR from 'commands/review_pr';
import SearchIssue from 'commands/search_issue';
import * as React from 'react';

const App = ({ commandKey, specData, resetCommand }: AppProps): React.ReactElement => {
  switch (commandKey) {
    case 'search_issue':
      return <SearchIssue specData={specData} resetCommand={resetCommand} />;
    case 'create_issue':
      return <CreateIssue specData={specData} resetCommand={resetCommand} />;
    case 'search_review_pr':
      return <SearchReviewPR specData={specData} resetCommand={resetCommand} />;
    case 'search_assigned_pr':
      return <SearchAssignedPR specData={specData} resetCommand={resetCommand} />;
    case 'create_pr':
      return <CreatePr specData={specData} resetCommand={resetCommand} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default App;
