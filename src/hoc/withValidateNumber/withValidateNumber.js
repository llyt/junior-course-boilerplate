import React from 'react'
import { toInt } from 'csssr-school-utils'

export default OriginalComponent => class Input extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value
		}
	}

	handleFilterInput = event => {

		const { name, value } = event.target

		const filteredValue = toInt(value) // Allow only numbers

		this.props.inputChange(name, filteredValue)	// Push new value to App.js

		return this.setState({
			value: filteredValue
		})	
	}

	render() {
		return <OriginalComponent  {...this.props} value={this.state.value} onChange={this.handleFilterInput} />
	}
}