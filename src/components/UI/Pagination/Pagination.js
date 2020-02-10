import React from 'react';
import styles from './Pagination.module.css'
import logRender from '../../../hoc/logRender/logRender'

class Pagination extends React.PureComponent {
  render() {
    return this.props.content.length > 1
      ? (
        <div className={styles.Pagination}>
          {this.props.content.map(({tag, href, body, currentClass}, index) => {
            const Tag = `${tag}`
            return (<Tag key={index} href={href} className={styles[currentClass]} onClick={this.props.handleClick}>{body}</Tag>)
          })}
        </div>
      )
      : ''
  }
}

export default logRender(Pagination);