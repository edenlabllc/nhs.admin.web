import React from 'react';
import Lightbox from 'react-images';
import withStyles from 'withStyles';

import styles from './styles.scss';

const DOCUMENTS = {
  'person.PASSPORT': 'Паспорт',
  'person.SSN': 'Індивідуальний податковий номер',
  'person.BIRTH_CERTIFICATE': 'Свідоцтво про народження',
  'confidant_person.0.PRIMARY.RELATIONSHIP.PASSPORT': 'Довірена особа: Паспорт',
  'confidant_person.0.PRIMARY.PASSPORT': 'Довірена особа: Паспорт',
  'confidant_person.0.PRIMARY.SSN': 'Довірена особа: Індивідуальний податковий номер',
  'confidant_person.1.SECONDARY.RELATIONSHIP.PASSPORT': 'Додаткова Довірена особа: Паспорт',
  'confidant_person.1.SECONDARY.PASSPORT': 'Додаткова Довірена особа: Паспорт',
  'confidant_person.1.SECONDARY.SSN': 'Додаткова Довірена особа: Індивідуальний податковий номер',
};

@withStyles(styles)
export default class Gallery extends React.Component {
  state = {
    lightboxIsOpen: false,
    currentImage: 0,
  };

  openImage(index) {
    this.setState({ currentImage: index, lightboxIsOpen: true });
  }

  render() {
    const { images = [] } = this.props;

    return (
      <div>
        <ul className={styles.images}>
          {
            images.map((image, i) => (
              <li onClick={() => this.openImage(i)} key={i}>
                <img src={image.url} role="presentation" />
                <span>{DOCUMENTS[image.type]}</span>
              </li>
            ))
          }
        </ul>
        <Lightbox
          images={images.map(image => ({ src: image.url, caption: DOCUMENTS[image.type] || '' }))}
          currentImage={this.state.currentImage}
          onClickPrev={() => this.setState({ currentImage: this.state.currentImage - 1 })}
          onClickNext={() => this.setState({ currentImage: this.state.currentImage + 1 })}
          isOpen={this.state.lightboxIsOpen}
          onClose={() => this.setState({ lightboxIsOpen: false })}
        />
      </div>
    );
  }
}
