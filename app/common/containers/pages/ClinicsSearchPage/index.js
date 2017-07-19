import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import { H1, H2 } from 'components/Title';
import Button from 'components/Button';

import SearchForm from 'containers/forms/SearchForm';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
export default class ClinicsSearchPage extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div id="clinics-search-page">
        <Helmet
          title={t('Clinics verification search')}
          meta={[
            { property: 'og:title', content: t('Clinics verification search') },
          ]}
        />

        <H1>{ t('Clinics verification') }</H1>

        <H2>{ t('Search clinic for verification') }</H2>

        <div className={styles.search}>
          <SearchForm
            active="edrpou"
            placeholder={t('Find clinic')}
            items={[
              { name: 'edrpou', title: t('By edrpou') },
              { name: 'legal_entity_id', title: t('By legal entity') },
              { name: 'settlement_id', title: t('By settlement id') },
            ]}
            onSubmit={(values) => {
              this.props.router.push({
                pathname: '/clinics-verification/list',
                query: values,
              });
            }}
          >
            <div className={styles.button}>
              <Button type="submit" color="blue">{ t('Find clinic') }</Button>
            </div>
          </SearchForm>
        </div>
        <div>
          <Button to="/clinics" theme="link">
            <span className={styles.link}>{ t('Go to clinics list') }</span>
          </Button>
        </div>
      </div>
    );
  }
}
