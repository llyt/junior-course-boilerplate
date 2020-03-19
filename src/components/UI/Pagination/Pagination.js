import React from 'react';
import styles from './Pagination.module.css'
import logRender from '../../../hoc/logRender/logRender'
import { NavLink } from 'react-router-dom'

class Pagination extends React.PureComponent {

  render() {
    const {pagination, urlSearchParams = {}} = this.props
    const page = urlSearchParams.page || '1'
    return (
      <div className={styles.Pagination}>
        {
          pagination
            &&
          pagination.map(([body, url], index) => {
            if (Number(page) === body) {
              return <span key={index + body} className={styles.active}>{body}</span>
            }
            if (typeof body === 'string') {
              return <NavLink className={styles.navLink} key={index + body} to={url}>{body}</NavLink>
            }
            return <NavLink key={index + body} to={url}>{body}</NavLink>
          })
        }
      </div>
    )
  }
}

export default logRender(Pagination)
