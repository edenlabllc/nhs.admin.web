import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import NavItem from 'components/NavItem';
import Icon from 'components/Icon';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(state => ({
  location: state.routing,
}))
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
          <NavItem to="clinics" activeClassName={styles.active}>
            <Link id="clinics-nav" to="/clinics">{ t('Clinics') }</Link>
          </NavItem>
          <NavItem to="declarations" activeClassName={styles.active}>
            <Link id="declarations-nav" to="/declarations">{ t('Declarations') }</Link>
          </NavItem>
          <NavItem to="pending-declarations" activeClassName={styles.active}>
            <Link id="pending-declarations-nav" to="/pending-declarations">{ t('Pending declarations') }</Link>
          </NavItem>
          <NavItem to="employees" activeClassName={styles.active}>
            <Link id="employees-nav" to="/employees">{ t('Employees') }</Link>
          </NavItem>
          <NavItem to="dictionaries" activeClassName={styles.active}>
            <Link id="dictionaries-nav" to="/dictionaries">{ t('Dictionaries') }</Link>
          </NavItem>
          <NavItem to="configuration" activeClassName={styles.active}>
            <Link id="configuration-nav" to="/configuration">{ t('System configuration') }</Link>
          </NavItem>
        </ul>
        <ul className={styles.down}>
          <li>
            <a href="http://docs.ehealthapi1.apiary.io" rel="noopener noreferrer" target="_blank">
              <Icon name="doc" />
              { t('Documentation') }
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
