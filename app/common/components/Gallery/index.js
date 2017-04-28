import React from 'react';
import Lightbox from 'react-images';
import withStyles from 'withStyles';

import styles from './styles.scss';

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
                <img src={image} role="presentation" />
              </li>
            ))
          }
        </ul>
        <Lightbox
          images={images.map(image => ({ src: image }))}
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
