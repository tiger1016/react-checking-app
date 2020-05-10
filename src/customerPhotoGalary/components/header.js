// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SectionHeader from 'GlobalComponents/SectionHeader'

class CustomerPhotoGalary extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='header'>
        <SectionHeader title='Photo Gallery' bigLeftPadding />
        <div className='right' />

      </div>
    )
  }
}

export default connect(
  state => {
    return {

    }
  }
)(CustomerPhotoGalary)
