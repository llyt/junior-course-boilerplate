import React from 'react';
import { logger } from 'csssr-school-utils'
import shallowCompare from 'react-addons-shallow-compare'

export default OriginalComponent => class logRender extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		if (!shallowCompare(this, nextProps, nextState)) {
			return false
		}
		logger.call(this, OriginalComponent.name, nextProps, nextState)
		return true
	}

	render() {
		return <OriginalComponent {...this.props} {...this.state}/>
	}
}