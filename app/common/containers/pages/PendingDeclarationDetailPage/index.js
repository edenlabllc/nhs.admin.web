import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';

import Lightbox from 'react-images';

import { H2 } from 'components/Title';
import Line from 'components/Line';
import Button, { ButtonsGroup } from 'components/Button';

import DeclarationDetail from 'containers/blocks/DeclarationDetail';

import { getDeclaration } from 'reducers';
import { updateDeclaration } from 'redux/declarations';

import { fetchDeclaration } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@withRouter
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchDeclaration(id)),
})
@connect((state, { params: { id } }) => ({
  declaration: getDeclaration(state, id),
}), { updateDeclaration })
export default class PendingDeclarationDetailPage extends React.Component {
  state = {
    lightboxIsOpen: false,
    currentImage: 0,
  };

  openImage(index) {
    this.setState({ currentImage: index, lightboxIsOpen: true });
  }

  updateStatus(status) {
    this.props.updateDeclaration(this.props.declaration.id, { status }).then(() => {
      this.props.router.push('/pending-declarations');
    });
  }

  render() {
    const { declaration = { }, t } = this.props;

    return (
      <div id="declaration-detail-page">
        <DeclarationDetail declaration={declaration} />

        <Line />

        <H2>{ t('Scans') }</H2>

        <ul className={styles.scans}>
          {
            declaration.media_content.map((image, i) => (
              <li onClick={() => this.openImage(i)} key={i}>
                <img src={image} role="presentation" />
              </li>
            ))
          }
        </ul>

        <Line />

        <ButtonsGroup>
          <Button onClick={() => this.updateStatus('accept')} color="green">
            { t('Accept') }
          </Button>
          <Button onClick={() => this.updateStatus('reject')} color="red">
            { t('Reject') }
          </Button>
        </ButtonsGroup>

        <Lightbox
          images={declaration.media_content.map(image => ({
            src: image,
          }))}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClose={() => this.setState({ lightboxIsOpen: false })}
        />
      </div>
    );
  }
}
