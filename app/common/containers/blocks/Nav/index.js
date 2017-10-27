import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classnames from 'classnames';
import nl2br from 'react-nl2br';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import NavItem from 'components/NavItem';
import Icon from 'components/Icon';

import ShowWithScope from 'containers/blocks/ShowWithScope';
import ShowMore from 'containers/blocks/ShowMore';

import { logOut } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(
  state => ({
    location: state.routing
  }),
  { logOut }
)
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
            <Link id="dashboard-nav" to="/dashboard">
              {t('Dashboard')}
            </Link>
          </NavItem>
          <ShowWithScope scope="declaration:read">
            <li>
              <ShowMore nav name={t('Declarations')}>
                <ul>
                  <NavItem to="declarations" activeClassName={styles.active}>
                    <Link id="declarations-nav" to="/declarations">
                      {t('Declarations')}
                    </Link>
                  </NavItem>
                  <NavItem
                    to="pending-declarations"
                    activeClassName={styles.active}
                  >
                    <Link
                      id="pending-declarations-nav"
                      to="/pending-declarations"
                    >
                      {t('Pending declarations')}
                    </Link>
                  </NavItem>
                </ul>
              </ShowMore>
            </li>
          </ShowWithScope>
          <ShowWithScope scope="employee:read">
            <li>
              <ShowMore nav name={t('Employees')}>
                <ShowWithScope scope="employee_request:read">
                  <ul>
                    <NavItem to="employees" activeClassName={styles.active}>
                      <Link id="employees-nav" to="/employees">
                        {t('Employees')}
                      </Link>
                    </NavItem>
                    <NavItem
                      to="pending-employees"
                      activeClassName={styles.active}
                    >
                      <Link id="pending-employees-nav" to="/pending-employees">
                        {nl2br(t('Pending\n employees'))}
                      </Link>
                    </NavItem>
                  </ul>
                </ShowWithScope>
              </ShowMore>
            </li>
          </ShowWithScope>
          <ShowWithScope scope="legal_entity:read">
            <NavItem to="clinics" activeClassName={styles.active}>
              <Link id="clinics-nav" to="/clinics">
                {t('Clinics')}
              </Link>
            </NavItem>
          </ShowWithScope>
          <ShowWithScope scope="legal_entity:read">
            <NavItem to="clinics-verification" activeClassName={styles.active}>
              <Link id="clinics-nav" to="/clinics-verification">
                {t('Clinics verification')}
              </Link>
            </NavItem>
          </ShowWithScope>
          <NavItem to="reports" activeClassName={styles.active}>
            <Link id="reports-nav" to="/reports">
              {t('Reports')}
            </Link>
          </NavItem>
          <NavItem to="dictionaries" activeClassName={styles.active}>
            <Link id="dictionaries-nav" to="/dictionaries">
              {t('Dictionaries')}
            </Link>
          </NavItem>
          <ShowWithScope scope="global_parameters:read">
            <NavItem to="configuration" activeClassName={styles.active}>
              <Link id="configuration-nav" to="/configuration">
                {t('System configuration')}
              </Link>
            </NavItem>
          </ShowWithScope>
          <li>
            <ShowMore nav name="Медикаменти">
              <ul>
                <ShowWithScope scope="innm:read">
                  <NavItem to="innms" activeClassName={styles.active}>
                    <Link id="innms-nav" to="/innms">
                      МНН
                    </Link>
                  </NavItem>
                </ShowWithScope>
                <ShowWithScope scope="innm_dosage:read">
                  <NavItem to="innm-dosages" activeClassName={styles.active}>
                    <Link id="innm-dosages-nav" to="/innm-dosages">
                      Лікарська форма
                    </Link>
                  </NavItem>
                </ShowWithScope>
                <ShowWithScope scope="medication:read">
                  <NavItem to="medications" activeClassName={styles.active}>
                    <Link id="medications-nav" to="/medications">
                      Торгова назва
                    </Link>
                  </NavItem>
                </ShowWithScope>
              </ul>
            </ShowMore>
          </li>
          <li>
            <ShowMore nav name={t('Програми')}>
              <ul>
                <ShowWithScope scope="medical_program:read">
                  <NavItem
                    to="medical-programs"
                    activeClassName={styles.active}
                  >
                    <Link id="medical-programs-nav" to="/medical-programs">
                      Перелік мед. програм
                    </Link>
                  </NavItem>
                </ShowWithScope>
                <ShowWithScope scope="program_medication:read">
                  <NavItem
                    to="program-medications"
                    activeClassName={styles.active}
                  >
                    <Link
                      id="program_medications-nav"
                      to="/program-medications"
                    >
                      Учасники програм
                    </Link>
                  </NavItem>
                </ShowWithScope>
              </ul>
            </ShowMore>
          </li>
          <li>
            <ShowMore nav name="Рецепти">
              <ul>
                <ShowWithScope scope="medication_request:read">
                  <NavItem
                    to="medication-requests"
                    activeClassName={styles.active}
                  >
                    <Link
                      id="medication-requests-nav"
                      to="/medication-requests"
                    >
                      Медичні запити
                    </Link>
                  </NavItem>
                </ShowWithScope>
                <ShowWithScope scope="medication_dispense:read">
                  <NavItem
                    to="medication-dispenses"
                    activeClassName={styles.active}
                  >
                    <Link
                      id="medication-dispenses-nav"
                      to="/medication-dispenses"
                    >
                      Рецепти
                    </Link>
                  </NavItem>
                </ShowWithScope>
              </ul>
            </ShowMore>
          </li>
        </ul>
        <ul className={styles.down}>
          <li>
            <a
              href="http://docs.uaehealthapi.apiary.io/#"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="doc" />
              {t('Documentation')}
            </a>
          </li>
          <li className={styles.logout} onClick={() => this.props.logOut()}>
            <Icon name="exit" />
            {t('Logout')}
          </li>
        </ul>
      </nav>
    );
  }
}
