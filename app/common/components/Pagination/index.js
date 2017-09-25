import React from 'react';
import withStyles from 'withStyles';
import classnames from 'classnames';
import { Link } from 'react-router';
import { createUrl } from 'helpers/url';
import PagePrevNext from './PagePrevNext';

import styles from './styles.scss';

@withStyles(styles)
export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleLink = this.handleLink.bind(this);
  }

  handleLink(page_number) {
    return createUrl(this.props.location.pathname, { ...location.query, page: page_number });
  }

  handlePage(pageIndex) {
    const total = this.props.totalPage;
    const current = this.state.currentPage;
    const page = pageIndex + 1;

    const limit = 8;
    const preservedDistanceToEdge = 4;
    const distanceToLastPage = Math.abs(total - page);
    const distanceToCurrent = Math.abs(page - current);
    const isEdgePage = page === total || page === 1;
    const isLastPreservedRange = (total - current) < preservedDistanceToEdge &&
      (distanceToLastPage < preservedDistanceToEdge);
    let isFirstPreservedRange = page <= preservedDistanceToEdge + 1 &&
      current <= preservedDistanceToEdge + 1;
    const configs = {
      page,
      href: this.handleLink(page),
    };

    if (current === preservedDistanceToEdge + 1 && total > limit) {
      isFirstPreservedRange = false;
    }

    /* truncated */
    if (total >= limit
      && current !== page
      && !isEdgePage
      && !isFirstPreservedRange
      && !isLastPreservedRange
      && distanceToCurrent > 1) {
      return <li key={page} className={classnames(styles.page, styles.truncated)}>...</li>;
    }

    return (<li
      className={classnames(
        styles.page,
        page === this.state.currentPage && styles['s-current'],
      )}
      key={page}
    >
      <Link to={configs.href} data-page={page}>
        { configs.page }
      </Link>
    </li>);
  }
  handleClick(e) {
    e.preventDefault();
    const page = e.target.getAttribute('data-page');
    if (page) {
      this.setState({ currentPage: parseInt(page, 10) });
      this.props.cb && this.props.cb(page);
    }
  }

  render() {
    const pageArray = Array.from(Array(this.props.totalPage).keys());
    const currentPage = this.state.currentPage;
    const prev = this.state.currentPage - 1;
    const next = this.state.currentPage + 1;
    return (
      <ul className={styles['g-pagination']} onClick={this.handleClick}>
        <PagePrevNext
          buttonType="prev"
          display={currentPage !== 1}
          goTo={prev}
          href={this.handleLink(prev)}
        />
        <ul>
          { pageArray.map(page => this.handlePage(page)) }
        </ul>
        <PagePrevNext
          buttonType="next"
          display={currentPage !== this.props.totalPage}
          goTo={next}
          href={this.handleLink(next)}
        />
      </ul>
    );
  }
}
