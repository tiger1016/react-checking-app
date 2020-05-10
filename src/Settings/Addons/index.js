// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { appController } from 'Controllers/appController'

// Functions
import { SortAddonsByName } from 'Functions/addons'

// Actions
import archiveAddon from 'Actions/addons/archiveAddon'
import createAddon from 'Actions/addons/createAddon'
import fetchFullAddons from 'Actions/addons/fetchFullAddons'
// import pushNewAddonLocally from 'Actions/addons/pushNewAddonLocally'
import removeNewLocalAddons from 'Actions/addons/removeNewLocalAddons'
import updateAddon from 'Actions/addons/updateAddon'

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

class Addons extends Component {
  state = {
    addons: this.props.addons,
    errors: []
  }

  componentWillMount () {
    if (this.noAddons()) {
      this.props.fetchFullAddons({ archived: 1 })
    }
  }

  isStateChanged = () => {
    const _newAddon = this.state.addons.find(a => a.new)
    return !!(!_.isEqual(this.props.addons, this.state.addons) || _newAddon)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.addons, nextProps.addons)) {
      const _addons = _.cloneDeep(nextProps.addons)
      this.setState({ addons: _addons })
    }
  }

  noAddons () {
    const {
      addons
    } = this.props

    return !addons || !utility.isAnArray(addons) || !addons.length
  }

  addNewAddonOnClick = () => {
    // this.props.pushNewAddonLocally()
    const addons = _.cloneDeep(this.state.addons)
    addons.unshift({
      new: true,
      id: utility.guid()
    })
    this.setState({
      addons,
      page: 0
    })
  }

  archivedFormat = v => v !== '1'

  archivedNormalize = v => v ? '0' : '1'

  handleInputValidate = ({ name, error }) => {
    if (!name) return
    const { errors } = this.state

    if (error && !errors.filter(e => e.name === name).length) {
      this.setState({ errors: [...this.state.errors, { name, error }] })
    } else if (!error && errors.find(e => e.name === name) !== undefined) {
      this.setState({ errors: errors.filter(e => e.name !== name) })
    }
  }

  /**
   * Cancel button action
   * @return {Void}
   */
  cancel = () => {
    const { addons } = this.props
    let _newAddon = this.state.addons.find(a => a.new)
    if (!_.isEqual(this.state.addons, addons) || _newAddon) {
      appController.confirmDiscardChanges(() => {
        this.props.removeNewLocalAddons()
        let _addons = _.cloneDeep(addons.filter(e => !e.new))
        this.setState({ addons: _addons, errors: [] })
      })
    }
  }
  createArchiveOnChange = (addon, _index) => () => {
    if (!addon.new) {
      let _addons = _.cloneDeep(this.state.addons)
      _addons[_index].archived = _addons[_index].archived === '0' ? '1' : '0'
      this.setState({ addons: _addons })
      this.props.archiveAddon(addon.active_addon_id, addon.archived === '0' ? '1' : '0')
    }
  }
  updateAddonName = (addon, newName) => {
    if (!addon.new) {
      this.props.updateAddon({
        ...addon,
        addon_name: newName
      })
    }
  }
  saveInput = (e, addon, name, _index, type) => {
    if (addon.new) {
      if (e.target.value || e.target.value !== addon[name]) {
        this.setAddonEditMode({
          ...addon,
          [name]: e.target.value
        }, false)
      }
    }
    this.handleInputChange(e, _index, type)
  }
  handleInputChange = (e, _index, type, isEditMode) => {
    const _addons = _.cloneDeep(this.state.addons)
    if (isEditMode != null || isEditMode !== undefined) {
      _addons[_index].editMode = isEditMode
    }
    if (type === 0) {
      if (_addons[_index].addon_name !== e.target.value) {
        _addons[_index].addon_name = e.target.value
        this.setState({ addons: _addons })
      }
    } else if (type === 1) {
      if (Number(_addons[_index].addon_price) !== Number(e.target.value)) {
        _addons[_index].addon_price = e.target.value
        this.setState({ addons: _addons })
      }
    } else if (type === 2) {
      if (Number(_addons[_index].default_walker_payroll) !== Number(e.target.value)) {
        _addons[_index].default_walker_payroll = e.target.value
        this.setState({ addons: _addons })
      }
    }
  }
  /**
   * Disables Save Button
   * @return {Bool} True for disabled, false for enabled
   */
  disabled () {
    const _newAddon = this.state.addons.find(a => a.new)
    return !_newAddon || (this.state.errors && this.state.errors.length)
  }
  /**
   * [newAddonFields description]
   * @type {Array}
   */
  newAddonFields = [{
    label: '+ add a new add-on',
    name: 'add-a-new-addon',
    type: 'link',
    value: 'add-a-new-addon',
    onClick: this.addNewAddonOnClick
  }]

  /**
   * Submits save button
   * @return {[type]} [description]
   */
  submit = () => {
    let actions = 0
    let addonsForCreate = this.state.addons.filter(a => a.new && a.addon_name && a.addon_price && a.default_walker_payroll)
    let addonsForUpdate = this.state.addons.filter((a) => {
      if (!a.new) {
        let oldAddon = this.props.addons.find(aa => Number(aa.id) === Number(a.id))
        if (!_.isEqual(oldAddon, a)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    })
    if (addonsForUpdate.length > 0) {
      appController.confirmSaveChanges(() => {
        actions = addonsForCreate.length + addonsForUpdate.length
        addonsForUpdate.forEach(a => { this.props.updateAddon(a, () => { actions-- }) })
      }, 'All future scheduled add-ons will be updated.Click OK to confirm.', () => {
        actions = addonsForCreate.length
        addonsForCreate.forEach(a => { this.props.createAddon(a, () => { actions-- }) })
      })
    } else {
      actions = addonsForCreate.length
      addonsForCreate.forEach(a => { this.props.createAddon(a, () => { actions-- }) })
    }
    return actions
  }

  //   confirmCostEdit = (addon, _index, type) => {
  //     const { addons } = this.props
  //
  //     let property = 'addon_price'
  //     if (type === 2) { property = 'default_walker_payroll' }
  //
  //     if (!addon.new && addons[_index][property] !== addon[property]) {
  //       appController.confirmSaveChanges(null, "All future scheduled add-ons will be updated.", () => {
  //         let _addon = addons.find(a => Number(a.id) === Number(addon.id))
  //         let _addons = _.cloneDeep(this.state.addons)
  //         _addons[_index][property] = _addon[property]
  //         this.setState({ addons: _addons })
  //       })
  //     }
  //   }

  buildCell = field => item => {
    const addon = item.original
    const { _index } = item.row

    return <Column
      div
      index={item.index}
      key={item.index}
      field={field(addon, _index)}
    />
  }

  setAddonEditMode = (addon, isEditMode) => {
    const addons = _.cloneDeep(this.state.addons.map(s => s.id === addon.id ? { ...s, editMode: isEditMode } : s))
    this.setState({ addons })
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!_.isEqual(nextState.addons, this.state.addons) ||
      nextProps.addonsLoading !== this.props.addonsLoading ||
      nextProps.addonsIsLoading !== this.props.addonsIsLoading ||
      nextState.page !== this.state.page ||
      !_.isEqual(nextState.errors, this.state.errors)) {
      return true
    }
    return false
  }

  render () {
    const { addonsIsLoading, addonsLoading } = this.props
    const { addons } = this.state
    return <div id='Addons' className='settings-section'>
      <SectionHeader title='Add-ons' noPadding />
      <div className='section-content'>
        <CustomTable
          data={addons}
          loading={!!addonsIsLoading}
          defaultPageSize={10}
          columns={[{
            columns: [
              {
                className: 'text strong',
                Cell: this.buildCell((addon, _index) => ({
                  name: `addons[${_index}].addon_name`,
                  type: addon.addon_name && !addon.new && !addon.editMode ? 'text' : 'text-input',
                  value: addon.addon_name || '',
                  // onChange: (e) => this.handleInputChange(e, _index, 0),
                  onClick: () => {
                    if (!addon.editMode) {
                      this.setAddonEditMode(addon, true)
                    }
                  },
                  onKeyDown: (e, err) => {
                    if (e.which === 27) {
                      this.setAddonEditMode(addon, false)
                    }
                    if (e.which === 13) {
                      let _oldAddon = this.props.addons.find(a => Number(a.id) === Number(addon.id))
                      if (!addon.new && _oldAddon.addon_name !== e.target.value) {
                        this.updateAddonName(addon, e.target.value, _index, 0)
                      }
                      this.handleInputValidate(err)
                      this.handleInputChange(e, _index, 0, false)
                    }
                  },
                  onBlur: (e, err) => {
                    // this.props.setAddonEditMode(addon, false)
                    let _oldAddon = this.props.addons.find(a => Number(a.id) === Number(addon.id))
                    if (!addon.new && _oldAddon.addon_name !== e.target.value) {
                      this.updateAddonName(addon, e.target.value, _index, 0)
                    }
                    this.handleInputValidate(err)
                    this.handleInputChange(e, _index, 0, false)
                  },
                  focused: addon.editMode,
                  // onValidate: this.handleInputValidate,
                  required: true,
                  minLength: 3,
                  maxLength: 50
                })),
                id: 'addon_name',
                label: 'ADD-ON NAME'
              },
              {
                Cell: this.buildCell((addon, _index) => ({
                  name: `addons[${_index}].addon_price`,
                  onBlur: (e) => this.saveInput(e, addon, 'addon_price', _index, 1),
                  // onBlur: () => this.confirmCostEdit(addon, _index, 1),
                  type: 'currency',
                  value: addon.addon_price != null ? parseFloat(addon.addon_price).toFixed(2) : '',
                  required: true,
                  width: '120px'
                })),
                id: 'cost',
                className: 'text',
                label: 'COMPANY PRICE',
                width: 150
              },
              {
                Cell: this.buildCell((addon, _index) => ({
                  name: `addons[${_index}].default_walker_payroll`,
                  onBlur: (e) => this.saveInput(e, addon, 'default_walker_payroll', _index, 2),
                  // onBlur: () => this.confirmCostEdit(addon, _index, 2),
                  type: 'currency',
                  value: addon.default_walker_payroll != null ? parseFloat(addon.default_walker_payroll).toFixed(2) : '',
                  required: true,
                  width: '120px'
                })),
                id: 'default_walker_payroll',
                className: 'text',
                label: 'STAFF PAY RATE',
                width: 150
              },
              {
                Cell: this.buildCell((addon, _index) => ({
                  checked: Number(addon.archived) !== 1,
                  format: this.archivedFormat,
                  name: `addons[${_index}].archived`,
                  onChange: this.createArchiveOnChange(addon, _index, 3),
                  type: 'switch',
                  normalize: this.archivedNormalize,
                  offText: 'NO',
                  onText: 'YES',
                  width: '57px',
                  disabled: addonsLoading
                })),
                id: 'archive',
                className: 'text',
                label: 'ACTIVE',
                width: 90
              }
            ]
          }]}
        />
        <InputGroup reduxForm fields={this.newAddonFields} />

      </div>
      {addonsIsLoading ? null : <SaveCancel
        loading={addonsLoading}
        cancelOnClick={this.cancel}
        disabled={this.disabled()}
        saveOnClick={this.submit}
      />}
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

const mapStateToProps = state => {
  const { addons, loading } = state.addons

  return {
    addons: SortAddonsByName(addons),
    addonsLoading: loading,
    addonsIsLoading: loading && !addons.length
  }
}

const mapDispatchToProps = {
  archiveAddon,
  createAddon,
  fetchFullAddons,
  removeNewLocalAddons,
  updateAddon
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Addons))
