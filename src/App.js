import React from 'react'
import './index.css'
import { SidebarConnect } from './containers/SidebarConnect'
import { ProductListConnect } from './containers/ProductListConnect'

class App extends React.PureComponent {
	render() {
		return (
			<div className="ProductPage">
					<SidebarConnect />
					<ProductListConnect />
			</div>
		) 
	}
}

export default App