import React from "react";
import { connect } from "react-redux";
import Lightbox from "react-images";
import withStyles from "withStyles";
import classnames from "classnames";
import { getDictionary } from "reducers";

import styles from "./styles.scss";

const DOCUMENTS = {
  "person.PASSPORT": "Паспорт",
  "person.SSN": "Індивідуальний податковий номер",
  "person.BIRTH_CERTIFICATE": "Свідоцтво про народження",

  "PRIMARY.RELATIONSHIP.PASSPORT": "Довірена особа: Паспорт",
  "confidant_person.0.PRIMARY.PASSPORT": "Довірена особа: Паспорт",
  "confidant_person.0.PRIMARY.SSN":
    "Довірена особа: Індивідуальний податковий номер",

  "confidant_person.1.SECONDARY.RELATIONSHIP.PASSPORT":
    "Додаткова Довірена особа: Паспорт",
  "confidant_person.1.SECONDARY.PASSPORT": "Додаткова Довірена особа: Паспорт",
  "confidant_person.1.SECONDARY.SSN":
    "Додаткова Довірена особа: Індивідуальний податковий номер"
};

const PERSON_TYPE = {
  "person.": "",
  "confidant_person.0.PRIMARY.RELATIONSHIP.": "Перша довірена особа: ",
  "confidant_person.1.SECONDARY.RELATIONSHIP.": "Друга довірена особа: "
};

// TEMPORARY_RESIDENCE_PERMIT(pin): "Посвідка про тимчасове проживання"
// TEMPORARY_CERTIFICATE(pin): "Посвідка на проживання"
// SSN(pin): "Довідка про присвоєння ідентифікаційного коду"
// REFUGEE_CERTIFICATE(pin): "Посвідка біженця"
// PERMANENT_RESIDENCE_PERMIT(pin): "Посвідка про постійне проживання"
// PASSPORT(pin): "Паспорт"
// NATIONAL_ID(pin): "Біометричний паспорт"
// COMPLEMENTARY_PROTECTION_CERTIFICATE(pin): "Посвідчення особи, яка потребує додаткового захисту"
// BIRTH_CERTIFICATE(pin): "Свідоцтво про народження"

@withStyles(styles)
@connect(state => ({
  document_type: getDictionary(state, "DOCUMENT_TYPE")
}))
export default class Gallery extends React.Component {
  state = {
    lightboxIsOpen: false,
    currentImage: 0,
    list: []
  };

  componentDidMount() {
    Promise.all(
      this.props.images.map(i =>
        this.hasImage(i.url)
          .then(resp => resp)
          .catch(() => null)
      )
    ).then(list => this.setState({ list }));
  }

  openImage(index) {
    this.setState({ currentImage: index, lightboxIsOpen: true });
  }

  hasImage = url =>
    new Promise((resolve, reject) => {
      const temp = new Image();
      temp.src = url;
      temp.onerror = e => reject(e);
      temp.onload = () => resolve(url);
    });

  render() {
    const { images = [], document_type } = this.props;

    const MERGED_TYPES = {};
    Object.keys(PERSON_TYPE).map(person_type =>
      Object.keys(document_type.values).map(
        item =>
          (MERGED_TYPES[`${person_type}${item}`] = `${
            PERSON_TYPE[person_type]
          }${document_type.values[item]}`)
      )
    );
    return (
      <div>
        <ul className={styles.images}>
          {(this.state.list || []).map((image, i) => (
            <li
              onClick={() => image && this.openImage(i)}
              key={i}
              className={classnames(
                styles.image,
                !image && styles.image_notfound
              )}
            >
              <span
                className={classnames(styles.image__el)}
                style={
                  image && {
                    backgroundImage: `url(${image})`
                  }
                }
              />
              <span className={styles.image__text}>
                {MERGED_TYPES[images[i].type]}
              </span>
            </li>
          ))}
        </ul>
        <Lightbox
          images={images.map(image => ({
            src: image.url,
            caption: MERGED_TYPES[image.type] || ""
          }))}
          currentImage={this.state.currentImage}
          onClickPrev={() =>
            this.setState({ currentImage: this.state.currentImage - 1 })
          }
          onClickNext={() =>
            this.setState({ currentImage: this.state.currentImage + 1 })
          }
          isOpen={this.state.lightboxIsOpen}
          onClose={() => this.setState({ lightboxIsOpen: false })}
        />
      </div>
    );
  }
}
