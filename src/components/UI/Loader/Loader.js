import React from 'react';
import styles from './Loader.module.css'
import Title from '../Title/Title'

const Loader = () => <>
	<Title level="1">Список товаров</Title>
	<div className={styles.Loader}><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/></div>
</>
 
export default Loader