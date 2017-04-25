import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import NavItem from 'components/NavItem';
import Icon from 'components/Icon';

import styles from './styles.scss';

@withStyles(styles)
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
    const { isOpen } = this.props;

    return (
      <nav className={classnames(styles.nav, isOpen && styles.open)}>
        <ul>
          <NavItem to="clinics" activeClassName={styles.active}>
            <Link id="clinics-nav" to="/clinics">Clinics</Link>
          </NavItem>
          <NavItem to="declarations" activeClassName={styles.active}>
            <Link id="declarations-nav" to="/declarations">Declarations</Link>
          </NavItem>
          <NavItem to="employees" activeClassName={styles.active}>
            <Link id="employees-nav" to="/employees">Employees</Link>
          </NavItem>
          <NavItem to="dictionaries">
            <Link id="dictionaries-nav" to="/dictionaries">Dictionaries</Link>
          </NavItem>
        </ul>
        <ul className={styles.down}>
          <li>
            <a href="http://docs.ehealthapi1.apiary.io" rel="noopener noreferrer" target="__blank">
              <Icon name="doc" />
              Documentation
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
