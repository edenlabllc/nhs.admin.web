import { push } from 'react-router-redux';
import { logout } from 'redux/session';

export const logOut = () => dispatch => dispatch(logout()).then(() => dispatch(push('/sign-in')));
