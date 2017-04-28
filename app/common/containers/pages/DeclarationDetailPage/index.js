import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';

import DeclarationDetail from 'containers/blocks/DeclarationDetail';

import { getDeclaration } from 'reducers';

import { fetchDeclaration } from './redux';

@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchDeclaration(id)),
})
@connect((state, { params: { id } }) => ({
  declaration: getDeclaration(state, id),
}))
export default class DeclarationDetailPage extends React.Component {
  render() {
    const { declaration = { } } = this.props;

    return (
      <div id="declaration-detail-page">
        <DeclarationDetail declaration={declaration} />
      </div>
    );
  }
}
