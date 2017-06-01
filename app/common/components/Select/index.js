import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';
import OuterClick from 'components/OuterClick';

import styles from './styles.scss';

const LIST_HEIGHT_PADDING = 32;

class Select extends React.Component {
  static propTypes = {
    active: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    labelText: PropTypes.string,
    open: PropTypes.bool,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        name: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        disabled: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
      })
    ).isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    open: false,
    multiple: false,
  };

  state = {
    open: this.props.open,
    active: (() => this.props.options.filter(item => item.name === this.props.active)[0])(),
  };

  componentWillReceiveProps(props) {
    if (props.active) {
      this.setState({
        active: this.props.options.filter(item => item.name === props.active)[0],
      });
    }
  }

  onSelect(item = {}) {
    if (this.props.multiple) {
      const active = Array.isArray(this.state.active) ? this.state.active : [];

      if (~active.indexOf(item.name)) {
        active.splice(active.indexOf(item.name), 1);
      } else {
        active.push(item.name);
      }

      this.setState({ active, open: false });

      this.props.onChange && this.props.onChange(active);

      return;
    }

    this.setState({ active: item, open: false });
    this.props.onChange && this.props.onChange(item.name);
  }

  /**
   * Calculate open drop down popup position
   * @returns {String<'top'|'bottom'>}
   */
  get position() {
    if (!this.selectNode) {
      return 'bottom';
    }

    const selectSize = this.selectNode.getBoundingClientRect();
    const screenHeight = document.documentElement.clientHeight;
    const selectHeight = this.listNode.clientHeight;

    if (screenHeight - selectSize.bottom > selectHeight + LIST_HEIGHT_PADDING) {
      return 'bottom';
    }

    return 'top';
  }

  get value() {
    return this.state.active;
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const {
      options = [],
      placeholder,
      disabled,
      labelText,
      multiple,
    } = this.props;

    const activeItem = this.state.active || (multiple ? [] : {});
    const classNames = classnames(
      styles.select,
      this.state.open && styles[this.position],
      this.state.open && styles.open,
      disabled && styles.disabled,
      multiple && styles.multiple,
    );

    return (
      <OuterClick onClick={() => this.setState({ open: false })}>
        <section ref={ref => (this.selectNode = ref)} className={classNames}>
          <div className={styles.label}>{labelText}</div>
          <div onClick={() => this.setState({ open: !this.state.open })} className={styles.control}>
            {
              multiple || <div>
                <span hidden={activeItem.title} className={styles.placeholder}>{placeholder}</span>
                <span hidden={!activeItem.title}>
                  {activeItem && activeItem.title}
                </span>
              </div>
            }
            {
              multiple && <div>
                {activeItem.length ? <ul className={styles['multiple-list']}>
                  {activeItem.map(name => <li key={`${name}-key`}>{name}</li>)}
                </ul> : <span className={styles.placeholder}>{placeholder}</span>}
              </div>
            }
            <span className={styles.arrow} />
          </div>
          <ul ref={ref => (this.listNode = ref)} className={styles.list}>
            {
              options.map(item => (
                <li
                  onClick={() => !item.disabled && this.onSelect(item)}
                  className={classnames(
                    (Array.isArray(activeItem) ?
                      ~activeItem.indexOf(item.name) :
                      item.name === activeItem.name) && styles.active,
                    item.disabled && styles.disabled
                  )}
                  key={item.name}
                >
                  {item.title}
                  {(Array.isArray(activeItem) ? ~activeItem.indexOf(item.name) : item.name === activeItem.name) ? <span className={styles.icon}><Icon name="check-right" /></span> : null}
                </li>
              ))
            }
          </ul>
        </section>
      </OuterClick>
    );
  }
}

export default withStyles(styles)(Select);
