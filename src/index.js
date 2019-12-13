import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import data from './products'


const app = (
	<div className='shop'>
		<h1>Список товаров</h1>
		<ul>
			{ data.map((product, index) => index < 3 ? <li>{product.name}</li> : null) }
		</ul>
	</div>
	
)

ReactDOM.render(app, document.getElementById('root'));