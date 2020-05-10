// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

// Components
import WalkerSearch from '../../../components/WalkerSearch'

// Utils
import { UrlUtil, utility } from 'Utils'

// Controllers
import { schedulerController, walkersController } from 'Controllers'

// Styles
import './index.css'

class WalkerList extends React.Component {
  createHandleSelectChange = filterName => value => {
    const { history, location } = this.props
    const { search } = location

    const newValue = value.map(v => Number(v.value))[0]
    const filter = UrlUtil.parseQuesryString(search) || {}
    let newFilter = filter[filterName]
    newFilter = utility.isAnArray(newFilter) ? [ ...newFilter.map(f => Number(f)) ] : []

    if (newValue === -1) {
      history.push(location.pathname)
    } else if (newValue === -2) {
      history.push(location.pathname + '?walkers[]=-2')
    } else {
      // remove All scheduled Stuff when new stuff choose
      const allStuffIdx = newFilter.indexOf(-2)
      if (allStuffIdx !== -1) {
        newFilter.splice(allStuffIdx, 1)
      }

      const indexOf = newFilter.indexOf(newValue)
      if (indexOf !== -1) {
        newFilter.splice(indexOf, 1)
      } else {
        newFilter.push(newValue)
      }

      const obj = {
        ...filter,
        [filterName]: utility.uniquesOfArray(newFilter)
      }
      const filterString = qs.stringify(obj)
      history.push(`${location.pathname}?${filterString}`)
    }
  }

  render () {
    const {
      highlightWalkerAndColumn,
      minRowHeight,
      location,
      walkerColumnWidth,
      walkers
    } = this.props

    const { search } = location
    const filter = UrlUtil.parseQuesryString(search) || {}
    const walkersFilter = utility.uniquesOfArray(filter.walkers || []).map(w => Number(w))
    const walkersCollection = walkersController.selectFormatWalkersArrayForSchedulerFilterDropdown()
    const walkersSelected = walkersCollection.filter(w => walkersFilter.includes(Number(w.value)))

    const { choices, placeholder } = schedulerController.preProcessDropDownFilterProps(
      walkersCollection,
      walkersSelected,
      'Walkers'
    )

    const { walkerId } = highlightWalkerAndColumn
    const wSelected = walkers.filter(w => w.filterSelected)
    const lastSelectedId = wSelected.length ? wSelected[wSelected.length - 1].walker_id : null

    return <div id='FirstColumn' style={{ width: `${walkerColumnWidth}px` }}>
      <div className='WalkerSearchContainer'>
        <WalkerSearch
          className='header-column-for-search'
          hasValue={walkersSelected.length}
          onChange={this.createHandleSelectChange('walkers')}
          options={choices}
          placeholder={placeholder}
        />
      </div>
      <div className='WalkerSearchContainer sticky-top' style={{ width: `${walkerColumnWidth - 1}px` }}>
        <WalkerSearch
          className='header-column-for-search'
          hasValue={walkersSelected.length}
          onChange={this.createHandleSelectChange('walkers')}
          options={choices}
          placeholder={placeholder}
        />
      </div>
      {walkers.map(walker => <div id={`header-walker-${walker.walker_id}`}
        className={`walker-label${`${walkerId}` === `${walker.walker_id}` ? ' active' : ''}${walker.walker_name.startsWith('*') ? ' selected' : ''}`}
        style={{
          borderBottom: `${lastSelectedId}` === `${walker.walker_id}` ? '3px dashed #1875F0' : null,
          minHeight: `${minRowHeight}px`
        }}
        key={`Header-Column-For-Walker-${walker.walker_id}`}>
        <span>{walker.walker_name.replace(/^\*/, '')}</span>
      </div>)}
    </div>
  }
}
const mapStateToProps = state => {
  return {
    filtersWalkers: state.scheduler.filters.walkers,
    highlightWalkerAndColumn: state.scheduler.highlightWalkerAndColumn,
    minRowHeight: state.scheduler.dailyViewMinRowHeight,
    walkerColumnWidth: state.scheduler.dailyViewWalkerColumnWidth
  }
}

export default withRouter(connect(mapStateToProps)(WalkerList))
