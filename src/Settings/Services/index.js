// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { appController, servicesController } from 'Controllers'

// Functions
import { SortServices } from 'Functions/services'

// Components
import Column from 'GlobalComponents/input/TableInputGroup/Column'
import CustomTable from 'GlobalComponents/CustomTable'
import InputGroup from 'GlobalComponents/input/InputGroup'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Utils
import { utility } from 'Utils'

// Styles
import './index.css'

const MINIMAL_SERVICE_LENGTH = 15
const MINUTES_IN_HOUR = 60

class Services extends Component {
  state = {
    services: this.props.services,
    errors: []
  }

  static defaultProps = {
    services: [],
    errors: []
  }

  componentWillMount () {
    if (this.noServices()) {
      servicesController.actions.fetchFullServices({ archived: '1' })
    }
  }

  isStateChanged = () => {
    const _newService = this.state.services.find(a => a.new)
    return !!(!_.isEqual(this.props.services, this.state.services) || _newService)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.services, nextProps.services)) {
      const _services = _.cloneDeep(nextProps.services)
      this.setState({ services: _services })
    }
  }

  noServices () {
    const { services } = this.props

    return !services || !utility.isAnArray(services) || !services.length
  }

  toggleSort = () => {
    const { sortBy } = this.props
    if (sortBy === 'date') {
      servicesController.actions.sortService('name')
    } else {
      servicesController.actions.sortService('date')
    }
  }
  handleInputValidate = ({ name, error }) => {
    if (!name) return
    const { errors } = this.state

    if (error && !errors.filter(e => e.name === name).length) {
      errors.push({ name, error })
      this.setState({ errors: [...errors] })
    } else if (!error && errors.find(e => e.name === name)) {
      errors.splice(errors.findIndex(e => e.name === name), 1)
      this.setState({ errors: [...errors] })
    }
  }

  getServiceLength = (service) => {
    const { lengthHours = 0, lengthMinutes = 0 } = service || {}
    return (Number(lengthHours) * MINUTES_IN_HOUR + Number(lengthMinutes))
  }

  handleTimeRequired = (service, names) => {
    if (this.getServiceLength(service) < MINIMAL_SERVICE_LENGTH) {
      names.forEach(name => this.handleInputValidate({ name, error: 'This field is required.' }))
      return true
    }

    names.forEach(name => this.handleInputValidate({ name, error: false }))
    return false
  }

  /**
   * [archiveFormat description]
   * @param  {[type]} v [description]
   * @return {[type]}   [description]
   */
  archiveFormat (v) {
    return Number(v) !== 1
  }

  /**
   * [archiveNormalize description]
   * @param  {[type]} v [description]
   * @return {[type]}   [description]
   */
  archiveNormalize (v) {
    return v ? 0 : 1
  }

  /**
   * [description]
   * @param  {[type]} service [description]
   * @param  {[type]} row     [description]
   * @param  {[type]} column) [description]
   * @return {[type]}         [description]
   */
  createArchivedOnChange = (service, _index) => () => {
    if (!service.new) {
      const _services = _.cloneDeep(this.state.services)
      _services[_index].archive = _services[_index].archive === 1 ? 0 : 1
      this.setState({ services: _services })
      servicesController.actions.updateService({ ...service, archive: service.archive === 1 ? 0 : 1, changedActiveState: true })
    }
  }
  updateService = (service) => {
    servicesController.actions.updateService({
      ...service
    })
  }

  /**
   * [addNewServiceFields description]
   * @type {Array}
   */
  addNewServiceFields = () => ([{
    label: '+ add a new service',
    name: 'add-a-new-service',
    type: 'link',
    value: 'add-a-new-service',
    onClick: this.onClickAddNewService
  }])

  /**
   * Cancel button action
   * @return {Void}
   */
  cancel = () => {
    const { services } = this.props
    const _newService = this.state.services.find(a => a.new)
    if (!_.isEqual(services, this.state.services) || _newService) {
      appController.confirmDiscardChanges(() => {
        servicesController.actions.removeNewLocalServices()
        const _services = _.cloneDeep(services.filter(e => !e.new))
        this.setState({ services: _services, errors: [] })
      })
    }
  }

  /**
   * Disables Save Button
   * @return {Bool} True for disabled, false for enabled
   */
  disabled () {
    const _newService = this.state.services.find(a => a.new)
    return !_newService || (this.state.errors && this.state.errors.length)
  }

  /**
   * [formDataServicesExist description]
   * @return {[type]} [description]
   */
  formDataServicesExist () {
    const { formData } = this.props
    return formData && formData.values && formData.values.services
  }

  /**
   * [description]
   * @param  {[type]} v [description]
   * @return {[type]}   [description]
   */
  hourNormalize = v => v < 10 ? '0' + v : v

  /**
   * [description]
   * @param  {[type]} v [description]
   * @return {[type]}   [description]
   */
  minuteNormalize = v => v < 10 ? '0' + v : v

  /**
   * [description]
   * @return {[type]} [description]
   */
  onClickAddNewService = () => {
    const services = _.cloneDeep(this.state.services)
    services.unshift({
      new: true,
      id: utility.guid()
    })
    this.setState({
      services,
      page: 0
    })
  }

  /**
   * [description]
   * @return {[type]} [description]
   */
  submit = () => {
    let actions = 0
    const servicesForCreate = this.state.services.filter(s => s.new && s.dropdown_description && s.cost && s.default_walker_payroll).map((s, i) => {
      if (s.lengthHours || s.lengthMinutes) {
        let length = `${s.lengthHours || '00'}:${s.lengthMinutes || '00'}:00`
        if (length !== s.length) return { ...s, length }
      }
      return s
    })

    const servicesForUpdate = this.state.services.filter((s) => {
      if (!s.new) {
        let oldService = this.props.services.find(ss => Number(ss.id) === Number(s.id))
        if (!_.isEqual(oldService, s)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }).map((s, i) => {
      if (s.lengthHours || s.lengthMinutes) {
        let length = `${s.lengthHours || '00'}:${s.lengthMinutes || '00'}:00`
        if (length !== s.length) return { ...s, length }
      }
      return s
    })

    if (servicesForUpdate.length > 0) {
      appController.confirmSaveChanges(() => {
        actions = servicesForCreate.length + servicesForUpdate.length
        servicesForCreate.forEach(s => { servicesController.actions.createService(s, () => { actions-- }) })
        servicesForUpdate.forEach(s => { servicesController.actions.updateService(s, () => { actions-- }) })
      }, 'All future scheduled services will be updated.Click OK to confirm.', () => {
        actions = servicesForCreate.length
        servicesForCreate.forEach(s => { servicesController.actions.createService(s, () => { actions-- }) })
      })
    } else {
      actions = servicesForCreate.length
      servicesForCreate.forEach(s => { servicesController.actions.createService(s, () => { actions-- }) })
    }
    return actions
  }

  saveInput = (service, name, _index, type) => (e, err) => {
    if (service.new) {
      if (e && e.target && (e.target.value || e.target.value !== service[name])) {
        this.setServiceEditMode({
          ...service,
          [name]: e.target.value
        }, false)
      } else if (e && e.value && (e.value !== service[name])) {
        this.setServiceEditMode({
          ...service,
          [name]: e.value
        }, false)
      }
    }
    err && this.handleInputValidate(err)
    this.handleInputChange(e, _index, type)
  }

  handleInputChange = (e, _index, type, isEditMode) => {
    const _services = _.cloneDeep(this.state.services)
    if (isEditMode != null || isEditMode !== undefined) {
      _services[_index].editMode = isEditMode
    }
    if (type === 0) {
      if (_services[_index].dropdown_description !== e.target.value) {
        _services[_index].dropdown_description = e.target.value
        this.setState({ services: _services })
      }
    } else if (type === 1) {
      if (Number(_services[_index].cost) !== Number(e.target.value)) {
        _services[_index].cost = e.target.value
        this.setState({ services: _services })
      }
    } else if (type === 2) {
      if (Number(_services[_index].default_walker_payroll) !== Number(e.target.value)) {
        _services[_index].default_walker_payroll = e.target.value
        this.setState({ services: _services })
      }
    } else if (type === 3) {
      if (e) {
        if (Number(_services[_index].lengthHours) !== Number(e.value)) {
          _services[_index].lengthHours = e.value
          this.setState({ services: _services })
        }
      }
    } else if (type === 4) {
      if (e) {
        if (Number(_services[_index].lengthMinutes) !== Number(e.value)) {
          _services[_index].lengthMinutes = e.value
          this.setState({ services: _services })
        }
      }
    }
  }

  buildCell = field => item => {
    const service = item.original
    const { _index } = item.row

    return <Column
      div
      index={item.index}
      key={item.index}
      field={field(service, _index)}
    />
  }

  handlePageChange = page => {
    this.setState({ page })
  }

  setServiceEditMode = (service, isEditMode) => {
    const services = _.cloneDeep(this.state.services.map(s => s.id === service.id ? { ...s, editMode: isEditMode } : s))
    this.setState({ services })
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!_.isEqual(nextState.services, this.state.services) ||
      nextProps.settingsIsLoading !== this.props.settingsIsLoading ||
      nextState.page !== this.state.page ||
      !_.isEqual(nextState.errors, this.state.errors)) {
      return true
    }
    return false
  }

  render () {
    const { services, settingsIsLoading } = this.props
    const isLoading = !services || !services.length || settingsIsLoading
    /**/
    return <div id='Services' className='settings-section'>
      <SectionHeader title='Services' noPadding />
      <div className='section-content'>
        <CustomTable
          data={this.state.services}
          loading={!!settingsIsLoading}
          defaultPageSize={10}
          page={this.state.page}
          onPageChange={this.handlePageChange}
          columns={[{
            columns: [
              {
                className: 'text strong',
                Cell: this.buildCell((service, _index) => ({
                  name: `services[${_index}].dropdown_description`,
                  onClick: () => {
                    if (!service.editMode) {
                      this.setServiceEditMode(service, true)
                    }
                  },
                  onKeyDown: (e, err) => {
                    if (e.which === 27) {
                      this.setServiceEditMode(service, false)
                    }
                    if (e.which === 13) {
                      const _oldService = services.find(s => Number(s.id) === Number(service.id))
                      if (!service.new && _oldService.dropdown_description !== e.target.value) {
                        const newService = { ...service, dropdown_description: e.target.value }
                        this.updateService(newService)
                      }
                      this.handleInputValidate(err)
                      this.handleInputChange(e, _index, 0, false)
                    }
                  },
                  onBlur: (e, err) => {
                    const _oldService = services.find(s => Number(s.id) === Number(service.id))
                    if (!service.new && _oldService.dropdown_description !== e.target.value) {
                      const newService = { ...service, dropdown_description: e.target.value }
                      this.updateService(newService)
                    }
                    this.handleInputValidate(err)
                    this.handleInputChange(e, _index, 0, false)
                  },
                  type: service.dropdown_description && !service.new && !service.editMode ? 'text' : 'text-input',
                  value: service.dropdown_description || '',
                  required: true,
                  maxLength: 50,
                  minLength: 3,
                  focused: service.editMode
                })),
                id: 'dropdown_description',
                label: 'SERVICE NAME'
              },
              {
                Cell: this.buildCell((service, _index) => ({
                  error: !service.cost || service.cost === undefined,
                  name: `services[${_index}].cost`,
                  onBlur: this.saveInput(service, 'cost', _index, 1),
                  type: 'currency',
                  value: parseFloat(service.cost).toFixed(2),
                  required: true
                })),
                id: 'cost',
                className: 'text',
                label: 'COMPANY PRICE',
                width: 150
              },
              {
                Cell: this.buildCell((service, _index) => ({
                  error: !service.default_walker_payroll || service.default_walker_payroll === undefined,
                  name: `services[${_index}].default_walker_payroll`,
                  onBlur: this.saveInput(service, 'default_walker_payroll', _index, 2),
                  type: 'currency',
                  value: parseFloat(service.default_walker_payroll).toFixed(2),
                  required: true
                })),
                id: 'default_walker_payroll',
                className: 'text',
                label: 'STAFF PAY RATE',
                width: 150
              },
              {
                Cell: this.buildCell((service, _index) => ({
                  error: this.getServiceLength(service) < MINIMAL_SERVICE_LENGTH,
                  hourOnChange: this.saveInput(service, 'lengthHours', _index, 3),
                  minuteOnChange: this.saveInput(service, 'lengthMinutes', _index, 4),
                  hourValue: Number(service.lengthHours || 0),
                  minuteValue: Number(service.lengthMinutes || 0),
                  hourName: `services[${_index}].lengthHours`,
                  hourNormalize: this.hourNormalize,
                  onValidate: this.handleInputValidate,
                  minuteName: `services[${_index}].lengthMinutes`,
                  minuteNormalize: this.minuteNormalize,
                  type: 'hour-minute',
                  required: this.handleTimeRequired(service, [`services[${_index}].lengthHours`, `services[${_index}].lengthMinutes`])
                })),
                id: 'length',
                className: 'text',
                label: 'SERVICE LENGTH',
                style: {
                  lineHeight: 'normal',
                  overflow: 'visible'
                },
                width: 250
              },
              {
                Cell: this.buildCell((service, _index) => ({
                  checked: Number(service.archive) !== 1,
                  format: this.archiveFormat,
                  name: `services[${_index}].archive`,
                  normalize: this.archiveNormalize,
                  onChange: this.createArchivedOnChange(service, _index, 4),
                  type: 'switch',
                  offText: 'NO',
                  onText: 'YES',
                  width: '57px',
                  disabled: this.props.serviceLoading
                })),
                id: 'archive',
                className: 'text',
                label: 'ACTIVE',
                width: 90
              }
            ]
          }]}
        />
        <InputGroup reduxForm fields={this.addNewServiceFields()} />
      </div>
      <div className='helper-msg'>Note: Services must be at least 15 minutes in length</div>
      {!isLoading && <SaveCancel
        loading={this.props.serviceLoading}
        cancelOnClick={this.cancel}
        disabled={this.disabled()}
        saveOnClick={this.submit}
      />}
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

const mapStateToProps = state => {
  const { loading, services } = state.services

  return {
    settingsIsLoading: loading && !services.length,
    serviceLoading: state.services.loading,
    sortBy: state.services.sortBy,
    services: SortServices(services, 'name')
  }
}

export default withRouter(connect(mapStateToProps)(Services))
