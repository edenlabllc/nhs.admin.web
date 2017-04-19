import React from 'react';
import { Route } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';

import TemplateListPage from 'containers/pages/TemplateListPage';
import TemplateEditPage from 'containers/pages/TemplateEditPage';
import DictionariesPage from 'containers/pages/DictionariesPage';
import DictionaryPage from 'containers/pages/DictionaryPage';

import NotFoundPage from 'containers/pages/NotFoundPage';


export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route component={App}>
      <Route component={Main}>
        <Route path="/">
          <Route path="templates" component={TemplateListPage} />
          <Route path="templates/:templateId" component={TemplateEditPage} />
          <Route path="dictionaries" component={DictionariesPage} />
          <Route path="dictionaries/:name" component={DictionaryPage} />
          {
            // <Route path="dictionaries/:name/update" component={TemplateEditPage} />
          }
          <Route path="*" component={NotFoundPage} />
        </Route>
      </Route>
    </Route>
  );
};
