import 'react';
import { connect } from 'react-redux';
import { getScope } from 'reducers';
import { hasScope } from 'helpers/scope';

export default connect(state => ({
  currentScope: getScope(state),
}))(
  ({ scope, currentScope, children }) => (hasScope(scope, currentScope) ? children : null)
);
