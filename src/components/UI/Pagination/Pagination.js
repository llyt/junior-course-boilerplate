import React from 'react';
import styles from './Pagination.module.css'
import logRender from '../../../hoc/logRender/logRender'
import queryString from 'query-string'

class Pagination extends React.PureComponent {

  makeNavLink = (text, stateParams, handler) => {
    const {page} = stateParams
    const textDispatch = {
      'Назад': parseInt(page) - 1,
      'Вперед': parseInt(page) + 1
    }
    const newParams = {
      ...stateParams,
      page: textDispatch[text]
    }
    const url = queryString.stringify(newParams, {arrayFormat: 'comma'})

    return <a href={`/?${url}`} className={styles.navLink} onClick={handler}>{text}</a>
  }

  render() {
    const {pagination, stateParams, handleClick} = this.props
    const {page} = stateParams

    return (
      <div className={styles.Pagination}>
        {page !== '1' ? this.makeNavLink('Назад', stateParams, handleClick) : null}

        {pagination.map(([body, url], index) => {
          if (index === parseInt(page) - 1) {
            return <span key={index + body} className={styles.active}>{body}</span>
          }
          return <a key={index + body} onClick={handleClick} href={url}>{body}</a>
        })}

        {page < pagination.length ? this.makeNavLink('Вперед', stateParams, handleClick) : null}
      </div>
    )
  }
}

export default logRender(Pagination)
