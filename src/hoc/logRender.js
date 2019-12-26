import React from 'react';
import { logger } from 'csssr-school-utils'

const logRender = WrappedComponent => {
	return class extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
			logger.call(this, this.constructor.name, nextProps, nextState);
			return true
		}
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}
 
export default logRender;