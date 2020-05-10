// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

// Components
import AddonsSelect from 'GlobalComponents/input/AddonsSelect'
import CustomSelect from 'GlobalComponents/input/CustomSelect'
import CustomersSelect from 'GlobalComponents/input/CustomersSelect'
import WalkersSelect from 'GlobalComponents/input/WalkersSelect'
import ModalTemplate from 'GlobalComponents/ModalTemplate'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import PetsSelect from 'GlobalComponents/input/PetsSelect'
import ServicesSelect from 'GlobalComponents/input/ServicesSelect'
import StatusSelect from 'GlobalComponents/input/StatusSelect'
import Button from 'GlobalComponents/Button'

// Constants
import { STATUS } from 'GlobalComponents/input/StatusSelect/constants'

// Controllers
import { appController, schedulerController, petsController } from 'Controllers'

// Utils
import { UrlUtil, utility } from 'Utils'

// Styles
import './index.css'

class FilterSchedulerModal extends React.Component {
  constructor () {
    super()
    this.separator = '<:>'
    this.state = {
      filter: {}
    }
  }

  componentDidMount () {
    let { search } = this.props
    let filter = UrlUtil.parseQuesryString(search) || {}

    this.setState({ filter })
  }

  createHandleSelectChange = filterName => value => {
    let { search } = this.props
    let filter = UrlUtil.parseQuesryString(search) || {}
    let filterValues = value.map(v => v.value)
    if (filterName !== 'status' && filterName !== 'pets') {
      filterValues = value.map(v => Number(v.value))
    }
    let obj = {
      ...filter,
      ...this.state.filter,
      [filterName]: utility.uniquesOfArray(filterValues)
    }
    this.setState({ filter: obj }, () => {
      // let filterString = qs.stringify(this.state.filter)
      // history.push(`${pathname}?${filterString}`)
    })
  }
  searchInit = () => {
    let { history, pathname } = this.props
    let filterString = qs.stringify(this.state.filter)
    history.push(`${pathname}?${filterString}`)
    appController.closeModal()
  }
  selectOpened = (level) => {
    let container = document.querySelector('.FilterSchedulerModal .ModalTemplate-body')
    let paddingBottom = '35px'
    switch (level) {
      case 1:
        paddingBottom = '70px'
        break
      case 2:
        paddingBottom = '140px'
        break
    }
    container.style.paddingBottom = paddingBottom
  }
  selectClosed = () => {
    let container = document.querySelector('.FilterSchedulerModal .ModalTemplate-body')
    container.style.paddingBottom = null
  }
  resetFilters = () => {
    let { history, pathname } = this.props
    history.push(pathname)
    this.setState({ filter: {} })
  }
  handleSearchChange = values => {
    let { history, pathname } = this.props

    let newFilter = {}

    values.forEach(v => {
      let splt = v.value.split(this.separator)
      let filterName = splt[0]
      let value = filterName === 'status' ? splt[1] : Number(splt[1])
      if (newFilter[filterName]) {
        newFilter[filterName].push(value)
      } else {
        newFilter[filterName] = []
        newFilter[filterName].push(value)
      }
    })

    this.setState({ filter: newFilter }, () => {
      let filterString = qs.stringify(this.state.filter)
      history.push(`${pathname}?${filterString}`)
    })
  }

  createSearchValueCollector = (filterName, textValue = false) => item => {
    let { filter } = this.state
    if (filter[filterName] && filter[filterName].length) {
      let value = textValue ? item.value.split(this.separator)[1] : Number(item.value.split(this.separator)[1])
      let filteredValues = filter[filterName].map(f => textValue ? f : Number(f))
      let valueExistsInFilter = filteredValues.indexOf(value)
      return valueExistsInFilter > -1
    }
    return false
  }

  render () {
    let {
      addons,
      customers,
      pets,
      services
    } = this.props
    customers.sort((a, b) => {
      if (a.first_name !== undefined && b.first_name !== undefined) {
        if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
          return 1
        } else if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
          return -1
        }
        return 0
      }
    })
    pets.sort((a, b) => {
      if (a.label !== undefined && b.label !== undefined) {
        if (a.label.toLowerCase() > b.label.toLowerCase()) {
          return 1
        } else if (a.label.toLowerCase() < b.label.toLowerCase()) {
          return -1
        }
        return 0
      }
    })
    addons.sort((a, b) => {
      if (a.name !== undefined && b.name !== undefined) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        return 0
      }
    })
    services.sort((a, b) => {
      if (a.dropdown_description !== undefined && b.dropdown_description !== undefined) {
        if (a.dropdown_description > b.dropdown_description) {
          return 1
        } else if (a.dropdown_description < b.dropdown_description) {
          return -1
        }
        return 0
      }
    })
    let shortService = services

    let addonsForSearch = addons.map(a => ({ label: a.name || a.addon_name, value: `addons${this.separator}${a.active_addon_id}` }))
    let customersForSearch = customers.map(c => ({ label: `${c.first_name} ${c.last_name}`, value: `customers${this.separator}${c.user_id}` }))
    let petsForSearch = pets.map(p => ({ label: p.label, value: `pets${this.separator}${p.value}` }))
    let servicesForSearch = shortService.map(s => ({ label: s.dropdown_description, value: `services${this.separator}${s.id}` }))
    let statusForSearch = STATUS.map(s => ({ ...s, value: `status${this.separator}${s.value}` }))

    let searchOptions = [...addonsForSearch, ...customersForSearch, ...pets, ...servicesForSearch, ...statusForSearch]
    let addonsValue = addonsForSearch.filter(this.createSearchValueCollector('addons'))
    let customersValue = customersForSearch.filter(this.createSearchValueCollector('customers'))
    let petsValue = petsForSearch.filter(this.createSearchValueCollector('pets', true))
    let servicesValue = servicesForSearch.filter(this.createSearchValueCollector('services'))
    let statusValue = statusForSearch.filter(this.createSearchValueCollector('status', true))

    let searchValue = [...addonsValue, ...customersValue, ...petsValue, ...servicesValue, ...statusValue]
    // utility.mutateSortCollectionBy(searchOptions, 'label')

    return <div className='FilterSchedulerModal'>
      <ModalTemplate
        actions={[
          {
            hide: false,
            disabled: false,
            onClick: () => {
              this.resetFilters()
            },
            text: 'Reset',
            textOnly: true
          },
          {
            loading: false,
            disabled: false,
            onClick: () => {
              this.searchInit()
            },
            text: 'Search'
          }
        ]}
        noHeader
      >
        <div className='FilterSchedulerModal-body'>
          <div className='search'>
            <CustomSelect multi onChange={this.handleSearchChange} placeholder='Search' searchFormat options={searchOptions.sort((a, b) => {
              if (a.label !== undefined && b.label !== undefined) {
                if (a.label.toLowerCase() > b.label.toLowerCase()) {
                  return 1
                } else if (a.label.toLowerCase() < b.label.toLowerCase()) {
                  return -1
                }
                return 0
              }
            })} value={searchValue} />
            <Button
              iconOnly='ion-close'
              onClick={() => {
                appController.closeModal()
              }}
              size='small'
              color='#808080'
              textOnly
            />
          </div>
          <ModalTemplateField
            input={
              <CustomersSelect
                multi
                onChange={this.createHandleSelectChange('customers')}
                placeholder='All Customers'
                value={this.state.filter.customers || []}
              />
            }
            label='Customers'
          />
          <ModalTemplateField
            input={
              <WalkersSelect
                multi
                onlyActive
                onChange={this.createHandleSelectChange('walkers')}
                placeholder='All Staff'
                value={this.state.filter.walkers || []}
              />
            }
            label='Staff'
          />
          <ModalTemplateField
            input={
              <PetsSelect
                multi
                uniqueName
                onChange={this.createHandleSelectChange('pets')}
                placeholder='All Pets'
                value={[]}
              />
            }
            label='Pets'
          />
          <ModalTemplateField
            input={
              <StatusSelect
                multi
                onChange={this.createHandleSelectChange('status')}
                onClose={this.selectClosed}
                onOpen={() => this.selectOpened(0)}
                placeholder='All Status'
                value={this.state.filter.status || []}
              />
            }
            label='Status'
          />
          <ModalTemplateField
            input={
              <ServicesSelect
                multi
                onChange={this.createHandleSelectChange('services')}
                onClose={this.selectClosed}
                onOpen={() => this.selectOpened(2)}
                placeholder='All Services'
                value={this.state.filter.services || []}
              />
            }
            label='Services'
          />
          <ModalTemplateField
            input={
              <AddonsSelect
                multi
                onChange={this.createHandleSelectChange('addons')}
                onClose={this.selectClosed}
                onOpen={() => this.selectOpened(2)}
                placeholder='All Addons'
                value={this.state.filter.addons || []}
              />
            }
            label='Addons'
          />
        </div>
      </ModalTemplate>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  let { location } = props
  let view = schedulerController.isView(location.pathname)
  return {
    services: state.services.services,
    addons: state.addons.addons,
    customers: state.customers.customers,
    pets: petsController.selectUniquePetsByNameForSelectInput(state),
    view
  }
}

export default withRouter(connect(mapStateToProps)(FilterSchedulerModal))
