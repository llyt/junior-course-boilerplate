import React from 'react';
import styles from './Pagination.module.css'
import logRender from '../../../hoc/logRender/logRender'
import { NavLink } from 'react-router-dom'
import queryString from 'query-string'
import removeObjProperty from '../../../utils/removeObjProperty'

class Pagination extends React.PureComponent {

  makeNavLink = (text, stateParams) => {
    const page = stateParams.page || '1'
    const textDispatch = {
      'Назад': parseInt(page) - 1,
      'Вперед': parseInt(page) + 1
    }
    let newParams = {
      ...stateParams,
      page: textDispatch[text]
    }

    if (newParams.page === 1) {
      newParams = removeObjProperty(newParams, 'page')
    }

    const url = decodeURIComponent(queryString.stringify(newParams, {arrayFormat: 'comma'}))

    return <NavLink to={`/?${url}`} className={styles.navLink}>{text}</NavLink>
  }

  render() {
    const {pagination, stateParams} = this.props
    const page = stateParams.page || '1'

    return (
      <div className={styles.Pagination}>
        {page !== '1' ? this.makeNavLink('Назад', stateParams) : null}

        {pagination.map(([body, url], index) => {

          if (index === page - 1) {
            return <span key={index + body} className={styles.active}>{body}</span>
          }
          return <NavLink key={index + body} to={url}>{body}</NavLink>
        })}

        {page < pagination.length ? this.makeNavLink('Вперед', stateParams) : null}
      </div>
    )
  }
}

export default logRender(Pagination)
