// Libraries
import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './index.css'

// Components
import CustomerProfileLeft from './components/CustomerProfileLeft'
import CustomerProfileRight from './components/CustomerProfileRight'

export default class CustomerProfile extends React.PureComponent {
  render () {
    const { customerId } = this.props
    return <div id='CustomerProfile'>
      <CustomerProfileLeft customerId={customerId} />
      <CustomerProfileRight customerId={customerId} />
    </div>
  }
}

CustomerProfile.propTypes = {
  customerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}
