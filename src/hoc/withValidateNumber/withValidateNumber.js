import React from 'react'
import { toInt } from 'csssr-school-utils'

export default OriginalComponent => class withValidateNumber extends React.Component {

		handleFilterInput = event => {

			const { name, value } = event.target

			const filteredValue = toInt(value) // Allow only numbers

			this.props.inputChange(name, filteredValue)

			return 
		}

		render() {
			return <OriginalComponent  {...this.props} value={this.props.value} onChange={this.handleFilterInput} />
		}
	}