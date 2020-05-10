// Libraries
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import qs from 'qs'
import { withRouter } from 'react-router-dom'

// Components
import Badge from 'GlobalComponents/Badge'
// import BulkDropdown from './components/BulkDropdown'
import Button from 'GlobalComponents/Button'
import CalendarPicker from './components/CalendarPicker'
import DateArrows from './components/DateArrows'
import TodayButton from './components/TodayButton'
import TimePeriodSelect from 'GlobalComponents/input/TimePeriodSelect'

// Constants
import { STATUS } from 'GlobalComponents/input/StatusSelect/constants'

// Utils
import { UrlUtil } from 'Utils'

// Controllers
import { appController, schedulerController, servicesController, petsController } from 'Controllers'

// Styles
import './index.css'

const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])

class CalendarHeader extends React.Component {
  state = { view: null }
  unlisten = null

  componentDidMount () {
    const {
      history,
      location
    } = this.props
    const view = schedulerController.isView(location.pathname)
    this.setState({ view }, () => {
      this.unlisten = history.listen((location, action) => {
        const view = schedulerController.isView(location.pathname)
        this.setState({ view })
      })
    })
  }

  componentWillUnmount () {
    this.unlisten()
  }

  onViewChange = selected => {
    const { history, location: { search } } = this.props
    const { value } = selected
    let path = `/scheduler/${value}`

    // month view has no search params

    if (value === 'month') {
      path = `/scheduler/${value}`
    } else if (value === 'day') {
      path = `/scheduler/${value}?walkers[]=-2`
    } else {
      path = `/scheduler/${value}${search || '?walkers[]=-2'}`
    }

    history.push(path)
  }

  openSearchModal = () => {
    appController.actions.toggleModal({
      canClose: true,
      data: null,
      isOpen: true,
      modalIdentifier: appController.constants.FILTER_SCHEDULER_MODAL_IDENTIFIER
    })
  }

  createRemoveFilter = (filterName, filterValue) => e => {
    const { history, location } = this.props
    const { search } = location
    const filter = UrlUtil.parseQuesryString(search) || {}
    if (filter[filterName]) {
      let newFilterValues = filter[filterName].filter(f => Number(f) !== Number(filterValue))
      if (filterName === 'status' || filterName === 'pets') {
        newFilterValues = filter[filterName].filter(f => f !== filterValue)
      }
      const newFilter = {
        ...filter,
        [filterName]: newFilterValues
      }
      const filterString = qs.stringify(newFilter)
      history.push(`${location.pathname}?${filterString}`)
    }
  }

  render () {
    const {
      addons,
      customers,
      walkers,
      location,
      pets,
      services
    } = this.props
    const { view } = this.state

    const status = STATUS
    const { search } = location
    const filters = UrlUtil.parseQuesryString(search) || {}

    let selectedCustomers = null
    if (filters.customers) {
      selectedCustomers = customers.filter(c => filters.customers
        .map(c => Number(c)).includes(Number(c.user_id)))
        .map(c => ({ label: `${c.first_name} ${c.last_name}`, value: Number(c.user_id) }))
    }
    let selectedWalkers = null
    if (filters.walkers) {
      selectedWalkers = walkers.filter(c => filters.walkers
        .map(c => Number(c)).includes(Number(c.user_id)))
        .map(c => ({ label: `${c.first_name} ${c.last_name}`, value: Number(c.user_id) }))
    }
    let selectedPets = null
    if (filters.pets) {
      selectedPets = pets.filter(c => filters.pets.map(c => c).includes(c.value))
    }

    let selectedStatus = null
    if (filters.status) {
      selectedStatus = status.filter(c => filters.status.includes(c.value))
    }

    let selectedServices = null
    if (filters.services) {
      selectedServices = services.filter(c => filters.services
        .map(c => Number(c)).includes(Number(c.id)))
        .map(c => ({ label: c.dropdown_description, value: Number(c.id) }))
    }

    let selectedAddons = null
    if (filters.addons) {
      selectedAddons = addons.filter(c => filters.addons
        .map(c => Number(c)).includes(Number(c.active_addon_id)))
        .map(c => ({ label: c.name, value: Number(c.active_addon_id) }))
    }

    return <div id='CalendarHeader'>
      <div className='filter-top-container'>
        <div className='left'>
          <CalendarPicker />
          <TodayButton />
          <DateArrows />
        </div>
        <div className='right'>
          <div className='badge-container'>
            {selectedCustomers && selectedCustomers.map((c, i) => <Badge key={`filter-badge-${i}`} text={c.label} closable closableOnClick={this.createRemoveFilter('customers', c.value)} />)}
            {selectedWalkers && selectedWalkers.map((c, i) => <Badge key={`filter-badge-${i}`} text={c.label} closable closableOnClick={this.createRemoveFilter('walkers', c.value)} />)}
            {selectedPets && selectedPets.map((c, i) => <Badge key={`filter-badge-${i}`} text={c.label} closable closableOnClick={this.createRemoveFilter('pets', c.value)} />)}
            {selectedStatus && selectedStatus.map((c, i) => <Badge key={`filter-badge-${i}`} text={c.label} closable closableOnClick={this.createRemoveFilter('status', c.value)} />)}
            {selectedServices && selectedServices.map((c, i) => <Badge key={`filter-badge-${i}`} text={c.label} closable closableOnClick={this.createRemoveFilter('services', c.value)} />)}
            {selectedAddons && selectedAddons.map((c, i) => <Badge key={`filter-badge-${i}`} text={c.label} closable closableOnClick={this.createRemoveFilter('addons', c.value)} />)}
          </div>
          <Button onClick={this.openSearchModal} iconOnly='ion-search' textOnly />
          <TimePeriodSelect onChange={this.onViewChange} secondary value={view} />
        </div>
        {/* <BulkDropdown /> */}
      </div>
    </div>
  }
}

CalendarHeader.propTypes = {
  addons: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired,
  pets: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  walkers: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    addons: state.addons.addons,
    customers: state.customers.customers,
    pets: petsController.selectUniquePetsByNameForSelectInput(state),
    services: servicesController.selectActiveServices(state),
    walkers: state.walkers.walkers
  }
}

export default withRouter(connect(mapStateToProps)(CalendarHeader))
