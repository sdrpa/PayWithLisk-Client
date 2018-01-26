import React from 'react'
import PropTypes from 'prop-types'

const ProgressIndicator = ({ animated }) => {
   if (animated) {
      return <i className="fa fa-circle-o-notch fa-spin" />
   }
   return null
}
ProgressIndicator.propTypes = {
   animated: PropTypes.bool.isRequired
}

export default ProgressIndicator
