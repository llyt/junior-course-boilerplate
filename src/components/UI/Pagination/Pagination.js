import React from 'react';
import styles from './Pagination.module.css'

class Pagination extends React.PureComponent {
	render() { 
		return (
			<div className={styles.Pagination}>
				<a href='/' className={styles.prevPage}>Назад</a>
				<span className={styles.active}>1</span>
				<a href='/'>2</a>
				<a href='/'>3</a>
				<a href='/'>4</a>
				<a href='/' className={styles.nextPage}>Вперед</a>
			</div>
		);
	}
}
 
export default Pagination;