import React from 'react';
import styles from './Pagination.module.css'
import logRender from '../../../hoc/logRender/logRender'
import queryString from 'query-string'

class Pagination extends React.PureComponent {

  render() {
    const paginationSource = [];
    const {category, page} = this.props.urlParams;

    const makeBackLink = () => {
      const newParams = {
        category,
        page: page - 1
      };
      const url = queryString.stringify(newParams, {arrayFormat: 'comma'});
      return <a href={`/?${url}`} onClick={this.props.handleClick}>Назад</a>
    };

    const makeNextLink = () => {
      const newParams = {
        category,
        page: page + 1
      };
      const url = queryString.stringify(newParams, {arrayFormat: 'comma'});
      return <a href={`/?${url}`} onClick={this.props.handleClick}>Вперед</a>
    };

    for (let i = 0; i < this.props.paginationLength; i += 1) {
      const newParams = {
        category,
        page: i + 1
      };
      const url = queryString.stringify(newParams, {arrayFormat: 'comma'});
      paginationSource.push([i + 1, `/?${url}`])
    }


    return (
      <div className={styles.Pagination}>
        {page !== 1 ? makeBackLink() : ''}

        {paginationSource.map(([body, url], index) => {
          if (page === index + 1) {
            return <span key={index + body} className={styles.active}>{body}</span>
          }
          return <a key={index + body} onClick={this.props.handleClick} href={url}>{body}</a>
        })}

        {page !== this.props.paginationLength ? makeNextLink() : ''}
      </div>
    )
  }
}

export default logRender(Pagination)
