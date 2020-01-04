import React from 'react'

const isNumber = value => (/^[0-9\b]+$/).test(value)

export default OriginalComponent => class Input extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			...props
		}
	}

	handleFilterInput = event => {
		event.preventDefault()

		const { name, value } = event.target

		if (value === '' || isNumber(value)) {

			this.state.inputChange(name, value)	// Push new value to App.js

			return this.setState({
				value
			})
		}	
	}

	render() {
		return <OriginalComponent  {...this.props} onChange={this.handleFilterInput} />
	}
}