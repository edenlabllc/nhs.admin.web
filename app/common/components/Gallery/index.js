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
    list: [],
  };

  componentDidMount() {
    Promise.all(this.props.images.map(i =>
      this.hasImage(i.url)
        .then(resp => resp)
        .catch(() => null)))
      .then(list => this.setState({ list }));
  }

  openImage(index) {
    this.setState({ currentImage: index, lightboxIsOpen: true });
  }

  hasImage = url => new Promise((resolve, reject) => {
    const temp = new Image();
    temp.src = url;
    temp.onerror = e => reject(e);
    temp.onload = () => resolve(url);
  });

  render() {
    const { images = [] } = this.props;

    return (
      <div>
        <ul className={styles.images}>
          {
            (this.state.list || []).map((image, i) => (
              <li onClick={() => image && this.openImage(i)} key={i}>
                {
                  image ? <img src={image} role="presentation" /> : <div className={styles.notFound} />
                }
                <span>{DOCUMENTS[images[i].type]}</span>
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
