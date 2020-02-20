import React from 'react';
import styles from './Pagination.module.css'
import logRender from '../../../hoc/logRender/logRender'

class Pagination extends React.PureComponent {

  render() {
    return (
      <div className={styles.Pagination}>
        {this.props.pagination.map(([body, url, cls], index) => {
          if (cls === 'active') {
            return <span key={index + body} className={styles[cls]}>{body}</span>
          }
          return <a key={index + body} className={styles[cls]} onClick={this.props.handleClick} href={url}>{body}</a>
        })}
      </div>
    )
  }
}

export default logRender(Pagination)
