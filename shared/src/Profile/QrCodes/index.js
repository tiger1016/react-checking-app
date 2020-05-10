// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'
// Controllers
import { appController, profileController } from 'Controllers'

// Components
import DataDisplay from 'GlobalComponents/DataDisplay'
import SectionHeader from 'GlobalComponents/SectionHeader'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SimplePieChart from 'GlobalComponents/chart/SimplePieChart'

// Styles
import './index.css'

class QrCodes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: [],
      assigned: this.props.qrcodes && this.props.qrcodes.qr_info ? this.props.qrcodes.qr_info.assigned : 0,
      qrcodeInfo: new (profileController.qrCodeStructGenerator())(this.props.qrcodes ? this.props.qrcodes.shipping_information : {}),
      qrcodeInfoRev: new (profileController.qrCodeStructGenerator())(this.props.qrcodes ? this.props.qrcodes.shipping_information : {}),
      un_assigned: this.props.qrcodes && this.props.qrcodes.qr_info ? this.props.qrcodes.qr_info.un_assigned : 0
    }
  }

  componentWillMount () {
    profileController.actions.fetchQrCodes()
  }

  isStateChanged = () => {
    return !_.isEqual(this.state.qrcodeInfo, this.state.qrcodeInfoRev)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      assigned: nextProps.qrcodes && nextProps.qrcodes.qr_info ? nextProps.qrcodes.qr_info.assigned : 0,
      qrcodeInfo: new (profileController.qrCodeStructGenerator())(nextProps.qrcodes ? nextProps.qrcodes.shipping_information : {}),
      qrcodeInfoRev: new (profileController.qrCodeStructGenerator())(nextProps.qrcodes ? nextProps.qrcodes.shipping_information : {}),
      un_assigned: nextProps.qrcodes && nextProps.qrcodes.qr_info ? nextProps.qrcodes.qr_info.un_assigned : 0
    })
  }

  /**
   * [description]
   * @return {[type]} [description]
   */
  qrOptions = () => { /* return options */ }

  /**
   * [description]
   * @param  {[type]} selected [description]
   * @return {[type]}          [description]
   */
  _changeQrorder = (selected) => {
    var qrcodeInfo = { ...this.state.qrcodeInfo }
    qrcodeInfo.quantity = selected.value
    this.setState({ qrcodeInfo })
  }

  /**
   * Save button onClick
   * @return {Void}
   */
  updateClick = () => profileController.actions.updateQrCodes(this.state.qrcodeInfo, () => { profileController.actions.fetchQrCodes() })

  /**
   * [description]
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  handleInputChange = (item) => {
    var qrcodeInfo = { ...this.state.qrcodeInfo }
    qrcodeInfo[item.target.name] = item.target.value
    this.setState({ qrcodeInfo })
  }

  /**
   * [description]
   * @param  {[type]} options.name  [description]
   * @param  {[type]} options.error [description]
   * @return {[type]}               [description]
   */
  handleInputValidate = ({ name, error }) => {
    if (error && !this.state.errors.filter(e => e.name === name).length) {
      this.setState({ errors: [...this.state.errors, { name, error }] })
    } else if (!error) {
      this.setState({ errors: this.state.errors.filter(e => e.name !== name) })
    }
  }

  createHandleSelectChange = name => selected => {
    const qrcodeInfo = { ...this.state.qrcodeInfo }
    qrcodeInfo[name] = selected ? selected.value : null
    this.setState({ qrcodeInfo })
  }

  render () {
    let color = '#FF9D9D'

    if (((this.state.assigned / this.state.un_assigned) * 100) < 25) {
      color = '#1875f0'
    }

    return <div id='QrCodes' className='profile-section'>
      <SectionHeader title='Order QR Codes' noPadding bigBottomPadding />
      <div className='section-content'>
        <SimplePieChart
          color={color}
          data={[{ value: this.state.un_assigned }, { value: this.state.assigned }]}
          innerLabel={this.state.un_assigned}
          outerLabel={'Remaining Barcodes'}
        />
        {/* <div className='section-label'>
          <span>Shipping Address</span>
        </div> */}
        <DataDisplay edit items={[
          {
            label: 'Street Address*',
            name: 'address_shipping',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            required: true,
            loading: this.props.profileIsLoading,
            value: this.state.qrcodeInfo.address_shipping,
            valueWidth: '30%'
          },
          {
            label: 'Street Address2*',
            name: 'address2_shipping',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            loading: this.props.profileIsLoading,
            value: this.state.qrcodeInfo.address2_shipping,
            valueWidth: '30%'
          },
          {
            label: 'City*',
            name: 'city_shipping',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            required: true,
            loading: this.props.profileIsLoading,
            value: this.state.qrcodeInfo.city_shipping,
            valueWidth: '30%'
          },
          {
            label: 'State*',
            name: 'state_shipping',
            onChange: this.createHandleSelectChange('state_shipping'),
            onValidate: this.handleInputValidate,
            required: true,
            loading: this.props.profileIsLoading,
            type: 'state',
            value: this.state.qrcodeInfo.state_shipping,
            valueWidth: '10%'
          },
          {
            label: 'To*',
            name: 'to',
            onChange: this.handleInputChange,
            value: this.state.qrcodeInfo.to,
            loading: this.props.profileIsLoading,
            valueWidth: '10%'
          },
          {
            label: 'Zip*',
            name: 'zip_shipping',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            required: true,
            loading: this.props.profileIsLoading,
            type: 'zip',
            value: this.state.qrcodeInfo.zip_shipping,
            valueWidth: '10%'
          },
          {
            label: 'Quantity*',
            name: 'quantity',
            onChange: this.createHandleSelectChange('quantity'),
            onValidate: this.handleInputValidate,
            required: true,
            loading: this.props.profileIsLoading,
            type: 'number-select',
            max: 200,
            min: 25,
            interval: 25,
            value: this.state.qrcodeInfo.quantity,
            valueWidth: '10%'
          }
        ]} />
        <SaveCancel loading={this.props.profileIsLoading} disabled={this.state.errors.length > 0} cancelOnClick={() => appController.confirmDiscardChanges(() => { this.setState({ isEdit: false, qrcodeInfo: { ...this.state.qrcodeInfoRev } }) })} saveOnClick={this.updateClick} saveText='Place Order' />
      </div>
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    qrcodes: state.profile.profile,
    profileIsLoading: state.profile.loading
  }
}

export default withRouter(connect(mapStateToProps)(QrCodes))
