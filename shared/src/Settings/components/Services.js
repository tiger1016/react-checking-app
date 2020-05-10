// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import ReactModal from 'react-modal'

// Styles
import '../styles/style.less'

// Constants
import { START_TIME, MINUTES } from '../../../constants/Constants'

// Components
import AddNewServiceModal from './AddNewServiceModal'
const form = reduxForm({
  form: 'settingsServices'
})

class Services extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openModal: false
    }
  }

  render () {
    console.log('services state', this.state)
    return (
      <div className='services-container'>
        <div className='services-container-header'>
          <span>Services</span>
          <div className='create-service' style={{ paddingRight: '2%' }}>
            <button onClick={() => this.setState({ openModal: true })} className='add-service-button'>
              <div style={{ fontFamily: 'Late', fontSize: '22px' }}>+</div>
              <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', lineHeight: '11px', paddingTop: '2px', paddingLeft: '10px' }}>NEW SERVICE</div>
            </button>
          </div>
        </div>
        <div className='add-new-service-modal'>
          <ReactModal
            className='ReactModal__Content ReactModal__Content--after-open'
            contentLabel='Example Modal'
            isOpen={this.state.openModal}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
          >
            <AddNewServiceModal closeModal={() => this.setState({ openModal: false })} />
          </ReactModal>
        </div>
        <div className='services-body'>
          <div className='services-header'>
            <div className='services-row-title' >
              <span>SERVICE NAME</span>
            </div>
            <div className='services-row-title'>
              <span>COMPANY PRICE</span>
            </div>
            <div className='services-row-title'>
              <span>STAFF PAY RATE</span>
            </div>
            <div className='services-row-title'>
              <span>SERVICE LENGTH</span>
            </div>
            <div className='services-row-title'>
              <span>ARCHIVE</span>
            </div>
          </div>
          <div className='services-row-container'>
            <div className='services-row' >
              <span>1 hour 30 minute dog walk</span>
            </div>
            <div className='services-row' >
              <span>$25.00</span>
            </div>
            <div className='services-row' >
              <div style={{ border: '2px solid gray', height: 45, width: '55%' }}>
                <span>$</span>
              </div>
            </div>
            <div className='services-row' >
              <Select
                name='form-field-name'
                value='one'
                className='services-hour'
                options={START_TIME}
                placeholder='-hr-'
              />
              <Select
                name='form-field-name'
                value='one'
                className='services-hour'
                options={MINUTES}
                placeholder='-mm-'
              />
            </div>
            <div className='services-row' >
              <span>insert icon</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '7%', paddingTop: '3%', fontSize: 12 }}>
            <button action='submit' style={{ width: 100 }}>Save</button>
            <div onClick={() => console.log('cancel')} style={{ marginLeft: '6.5%', cursor: 'pointer' }}>cancel</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {

    }
  }
)(form(Services)))
