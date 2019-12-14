import React from 'react'
import data from './products'
import './index.css'

const App = () => (
		<div className='shop'>
			<h1>Список товаров</h1>
			<ul>
				{ data.slice(0, 3).map(product => <li>{product.name}</li>) }
			</ul>
		</div>
  )
export default App