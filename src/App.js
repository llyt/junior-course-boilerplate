import React from 'react'
import data from './products'
import './index.css'

const App = () => {
  return (
		<div className='shop'>
			<h1>Список товаров</h1>
			<ul>
				{ data.map((product, index) => index < 3 ? <li>{product.name}</li> : null) }
			</ul>
		</div>
  )
}
export default App