import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import NavItem from 'components/NavItem';
import Icon from 'components/Icon';
import ShowWithScope from 'containers/blocks/ShowWithScope';

import { logOut } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(state => ({
  location: state.routing,
}), { logOut })
export default class Nav extends React.Component {
  componentWillReceiveProps(props) {
    if (props.isOpen) {
      document.documentElement.classList.add(styles.navIsOpen);
    } else {
      document.documentElement.classList.remove(styles.navIsOpen);
    }
  }
  render() {
    const { isOpen, t } = this.props;

    return (
      <nav className={classnames(styles.nav, isOpen && styles.open)}>
        <ul>
          <NavItem to="/dashboard" activeClassName={styles.active}>
            <Link id="dashboard-nav" to="/dashboard">{ t('Dashboard') }</Link>
          </NavItem>
          <ShowWithScope scope="declaration:read">
            <NavItem to="declarations" activeClassName={styles.active}>
              <Link id="declarations-nav" to="/declarations">{ t('Declarations') }</Link>
            </NavItem>
          </ShowWithScope>
          <ShowWithScope scope="declaration_request:read">
            <NavItem to="pending-declarations" activeClassName={styles.active}>
              <Link id="pending-declarations-nav" to="/pending-declarations">
                { t('Pending declarations') }
              </Link>
            </NavItem>
          </ShowWithScope>
          <ShowWithScope scope="employee:read">
            <NavItem to="employees" activeClassName={styles.active}>
              <Link id="employees-nav" to="/employees">{ t('Employees') }</Link>
            </NavItem>
          </ShowWithScope>
          <ShowWithScope scope="employee_request:read">
            <NavItem to="pending-employees" activeClassName={styles.active}>
              <Link id="pending-employees-nav" to="/pending-employees">{ t('Pending employees') }</Link>
            </NavItem>
          </ShowWithScope>
          <ShowWithScope scope="legal_entity:read">
            <NavItem to="clinics" activeClassName={styles.active}>
              <Link id="clinics-nav" to="/clinics">{ t('Clinics') }</Link>
            </NavItem>
          </ShowWithScope>
          <ShowWithScope scope="legal_entity:read">
            <NavItem to="clinics-verification" activeClassName={styles.active}>
              <Link id="clinics-nav" to="/clinics-verification">{ t('Clinics verification') }</Link>
            </NavItem>
          </ShowWithScope>
          <NavItem to="reports" activeClassName={styles.active}>
            <Link id="reports-nav" to="/reports">{ t('Reports') }</Link>
          </NavItem>
          <NavItem to="dictionaries" activeClassName={styles.active}>
            <Link id="dictionaries-nav" to="/dictionaries">{ t('Dictionaries') }</Link>
          </NavItem>
          <ShowWithScope scope="global_parameters:read">
            <NavItem to="configuration" activeClassName={styles.active}>
              <Link id="configuration-nav" to="/configuration">{ t('System configuration') }</Link>
            </NavItem>
          </ShowWithScope>
        </ul>
        <ul className={styles.down}>
          <li>
            <a href="http://docs.ehealthapi1.apiary.io" rel="noopener noreferrer" target="_blank">
              <Icon name="doc" />
              { t('Documentation') }
            </a>
          </li>
          <li className={styles.logout} onClick={() => this.props.logOut()}>
            <Icon name="exit" />
            { t('Logout') }
          </li>
        </ul>
      </nav>
    );
  }
}
