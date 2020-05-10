// Libraries
import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

// Components
import WalkerSearch from '../../../components/WalkerSearch'

// Utils
import { dateTimeUtil, UrlUtil, utility } from 'Utils'

// Controllers
import { schedulerController, walkersController } from 'Controllers'

// Stlyes
import './index.css'

class HeaderRow extends React.Component {
  constructor () {
    super()
    this.state = {
      isVisible: false
    }
  }
  componentDidMount () {
    let {
      adjustFixedColumnSearch,
      searchOnly,
      walkers
    } = this.props
    if (!searchOnly) {
      let element = document.getElementById('header-column-for-search')
      adjustFixedColumnSearch(element)
    }
    if (!walkers || !walkers.length) {
      walkersController.actions.fetchWalkers()
    }
  }
  shouldComponentUpdate (nextProps) {
    return this.state.isVisible
  }
  createHandleSelectChange = filterName => value => {
    const { history, location } = this.props
    const { search } = location
    const newValue = value.map(v => Number(v.value))[0]
    const filter = UrlUtil.parseQuesryString(search) || {}
    const newFilter = utility.isAnArray(filter[filterName]) ? [ ...filter[filterName].map(f => Number(f)) ] : []
    let filterString

    if (newValue === -1) {
      delete filter[filterName]
      filterString = qs.stringify(filter)
    } else if (newValue === -2) {
      filterString = qs.stringify({
        ...filter,
        [filterName]: [-2]
      })
    } else {
      if (newFilter.indexOf(-2) > -1) {
        newFilter.splice(newFilter.indexOf(-2), 1)
      }
      const indexOf = newFilter.indexOf(newValue)
      if (indexOf > -1) {
        newFilter.splice(indexOf, 1)
      } else {
        newFilter.push(newValue)
      }
      filterString = qs.stringify({
        ...filter,
        [filterName]: utility.uniquesOfArray(newFilter)
      })
    }

    history.push({
      pathname: location.pathname,
      search: filterString
    })
  }

  renderColumns = () => {
    let {
      columns,
      highlightWalkerAndColumn,
      searchOnly
    } = this.props
    let { columnData } = highlightWalkerAndColumn
    return searchOnly ? null : columns.map(c => <div key={`header-column-for-${c.id}`}
      id={`header-column-for-${c.id}`}
      className={`grid-header-column${columnData.date === c.id ? ' active' : ''}${' ' + dateTimeUtil.dateStatus(c.id)}`}>
      {c.label}
    </div>)
  }
  renderFilter = () => {
    let {
      searchHeight,
      searchOnly,
      location
    } = this.props

    let { search } = location
    let filter = UrlUtil.parseQuesryString(search) || {}
    let walkersFilter = utility.uniquesOfArray(filter.walkers || []).map(w => Number(w))
    let walkersCollection = walkersController.selectFormatWalkersArrayForSchedulerFilterDropdown()
    let walkersSelected = walkersCollection.filter(w => {
      return walkersFilter.includes(Number(w.value))
    })

    let {
      choices,
      placeholder
    } = schedulerController.preProcessDropDownFilterProps(
      walkersCollection,
      walkersSelected,
      'Walkers'
    )

    return <div
      id={searchOnly ? 'header-column-for-search-only' : 'header-column-for-search'}
      className={`grid-header-column${searchOnly ? ' search-only' : ''}`}
      style={{ height: (searchHeight || 'auto') }}>
      <div className='walkerSearch'>
        <WalkerSearch
          className='scheduler-select'
          hasValue={walkersSelected.length}
          onChange={this.createHandleSelectChange('walkers')}
          options={choices}
          placeholder={placeholder}
        />
      </div>
    </div>
  }
  render () {
    return <VisibilitySensor partialVisibility delayedCall onChange={isVisible => this.setState({ isVisible })}>
      <div id='grid-header-row' className={`grid-header-row`}>
        {this.renderFilter()}
        {this.renderColumns()}
      </div>
    </VisibilitySensor>
  }
}

const mapStateToProps = state => {
  return {
    highlightWalkerAndColumn: state.scheduler.highlightWalkerAndColumn,
    walkers: state.walkers.walkers
  }
}

export default withRouter(connect(mapStateToProps)(HeaderRow))
