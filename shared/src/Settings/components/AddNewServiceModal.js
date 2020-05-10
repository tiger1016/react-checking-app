// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

// Styles
import '../styles/style.less'

const form = reduxForm({
  form: 'settingsAddNewService'
})

class AddNewServiceModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      companyPrice: '',
      serviceName: '',
      serviceLength: '',
      staffPayRate: ''
    }
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _handleFormSubmit (formProps) {
    // this.props.closeModal
    console.log('submit')
  }

  render () {
    console.log('add new service modal', this.props.addNewServiceForm, this.props)
    const { handleSubmit } = this.props
    return (
      <div className='modal-main-container'>
        <div className='modal-header-container'>
          <div className='modal-header'>
            <div className='appointment-details'>
              ADD NEW SERVICE
            </div>
          </div>
        </div>

        <div >
          <div className='service-details-container'>
            <div className='add-new-service-title'>New Service Details</div>
            <form onSubmit={handleSubmit(this._handleFormSubmit)}>
              <div className='add-service-row' style={{ backgroundColor: '#F4F4F4' }}>
                <span style={{ color: 'black' }}>SERVICE NAME</span>
                <Field type='text' component='input' name='ServiceName' placeholder='Add name of service' style={{ backgroundColor: '#F4F4F4' }} value={this.state.serviceName} onChange={(e) => this.setState({ serviceName: e.target.value })} />
              </div>
              <div className='add-service-row' >
                <span>COMPANY PRICE</span>
                <Field type='text' component='input' name='CompanyPrice' placeholder='Add cost of service' value={this.state.companyPrice} onChange={(e) => this.setState({ companyPrice: e.target.value })} />
              </div>
              <div className='add-service-row' style={{ backgroundColor: '#F4F4F4' }}>
                <span>STAFF PAY RATE</span>
                <Field type='text' component='input' name='StaffPayRate' placeholder='Add employee pay rate' style={{ backgroundColor: '#F4F4F4' }} value={this.state.staffPayRate} onChange={(e) => this.setState({ staffPayRate: e.target.value })} />
              </div>
              <div className='add-service-row' >
                <span>SERVICE LENGTH</span>
                <Field type='text' component='input' name='ServiceLength' placeholder='Add length of service' value={this.state.serviceLength} onChange={(e) => this.setState({ serviceLength: e.target.value })} />
              </div>
              <div className='create-service' style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '5%', paddingLeft: '5%' }}>
                <button action='submit' className='add-service-button' style={{ backgroundColor: '#3DA647' }}>
                  <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', lineHeight: '11px', paddingTop: '2px', paddingLeft: '10px' }}>SAVE SERVICE</div>
                </button>
                <button onClick={this.props.closeModal} className='add-service-button' style={{ marginLeft: 20, backgroundColor: '#7D7D7D' }}>
                  <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', lineHeight: '11px', paddingTop: '2px', paddingLeft: '10px' }}>CANCEL</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(connect(
  state => {
    return {
      addNewServiceForm: state.form.settingsAddNewService
    }
  }
)(form(AddNewServiceModal)))
