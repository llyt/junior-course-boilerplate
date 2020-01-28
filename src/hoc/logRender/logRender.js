import React from 'react';
import { logger } from 'csssr-school-utils'
import shallowCompare from 'react-addons-shallow-compare'

const getDisplayName = OriginalComponent => {
  return OriginalComponent.displayName || OriginalComponent.name || 'Component'
}

export default OriginalComponent => {
  class logRender extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      if (!shallowCompare(this, nextProps, nextState)) {
        return false
      }
      logger.call(this, getDisplayName(OriginalComponent), nextProps, nextState)
      return true
    }

    render() {
      return <OriginalComponent {...this.props} {...this.state} />
    }
  }

  logRender.displayName = `logRenderHOC(${getDisplayName(OriginalComponent)})`

  return logRender
}