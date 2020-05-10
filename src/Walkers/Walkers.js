// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'
import Loadable from 'react-loadable'

// Config
import loadableConfig from 'Config/loadable.config'

// Utility
import { utility } from 'Utils'

// Controllers
import { appController, walkersController, sessionController } from 'Controllers'

// Components
import FullScreenTextOnly from 'GlobalComponents/FullScreenTextOnly'

// Styles
import './index.css'
const LoadingComponent = props => {
  return <FullScreenTextOnly text='Loading' spinner />
}
const _loadableConfig = {
  ...loadableConfig,
  loading: LoadingComponent
}
const Button = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/Button')
})
const CustomTable = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/CustomTable')
})
const CenteredTextNotify = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/CenteredTextNotify')
})
const SearchInput = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/searchInput')
})
const SectionHeader = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/SectionHeader')
})
const Switch = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/input/Switch')
})

class Walkers extends Component {
  constructor () {
    super()
    this.state = {
      searchWalker: '',
      sortFilter: 'az',
      activeFilter: true
    }
  }
  componentDidMount () {
    appController.actions.openSideBar()
  }
  componentWillMount () {
    if (!this.props.walkers || !this.props.walkers.length) {
      walkersController.actions.fetchWalkers()
    }
  }

  searchWalker = (event) => {
    this.setState({
      searchWalker: event.target.value
    })
  }
  sortStaff = () => {
    if (this.state.sortFilter === 'za') {
      this.setState({
        sortFilter: 'az'
      })
    } else {
      this.setState({
        sortFilter: 'za'
      })
    }
  }
  noInactiveWalkers = () => {
    return this.props.walkers.filter(item => item.active === 0).length === 0
  }
  toggleActiveFilter = () => {
    if (this.noInactiveWalkers()) {
      walkersController.actions.fetchWalkers(true)
    }
    this.setState({ activeFilter: !this.state.activeFilter })
  }
  searchFilter = (walker, index) => {
    if (this.state.searchWalker === '') {
      return true
    } else {
      if (walker.first_name.toUpperCase().includes(this.state.searchWalker.toUpperCase()) || walker.last_name.toUpperCase().includes(this.state.searchWalker.toUpperCase()) || walker.email.toUpperCase().includes(this.state.searchWalker.toUpperCase())) {
        return true
      }
    }
    return false
  }
  dynamicSort = (property) => {
    var sortOrder = 1
    if (property === 'az') {
      return function (a, b) {
        var result = (a['last_name'] < b['last_name']) ? -1 : (a['last_name'] > b['last_name']) ? 1 : 0
        return result * sortOrder
      }
    } else {
      return function (a, b) {
        var result = (a['last_name'] > b['last_name']) ? -1 : (a['last_name'] < b['last_name']) ? 1 : 0
        return result * sortOrder
      }
    }
  }
  search = (value, walkers) => {
    let options = {
      threshold: 0.2,
      keys: ['first_name', 'last_name', 'phone_mobile', 'phone_home', 'phone_work', 'username', 'address']
    }
    let fuse = new Fuse(walkers, options)
    return fuse.search(value)
  }
  openWalkerAddModal = () => {
    appController.actions.toggleModal({
      canClose: true,
      data: null,
      isOpen: true,
      modalIdentifier: appController.constants.ADD_WALKER_MODAL_IDENTIFIER
    })
  }
  render () {
    let {
      walkers,
      walkersIsLoading,
      userType
    } = this.props

    if (!utility.isEmpty(this.state.searchValue)) walkers = this.search(this.state.searchValue, walkers)
    if (this.state.activeFilter) walkers = walkers.filter(item => Number(item.active) !== 0)
    if (!this.state.activeFilter) walkers = walkers.filter(item => Number(item.active) === 0)
    let loading = walkersIsLoading

    return <div id='Staff'>
      <SectionHeader
        bigBottomPadding
        title='Staff'
        leftComponent={loading ? null : <div className='toggle-active-staff'><div className='header-action-label'>{!this.state.activeFilter ? 'Inactive' : 'Active'}</div><Switch checked={this.state.activeFilter} name='active' noText onChange={this.toggleActiveFilter} /></div>}
        rightComponent={(loading || (userType !== 'licensee' && userType !== 'full_scheduling_admin')) ? null : <Button onClick={this.openWalkerAddModal} text='ADD STAFF' round />}
      />
      {loading ? null : <SearchInput value={this.state.searchValue} onChange={e => this.setState({ searchValue: e.target.value })} />}
      {(loading || walkers.length > 0) && <CustomTable
        data={walkers}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: e => this.props.history.push(`/walker/${rowInfo.original.user_id}`)
        })}
        loading={loading}
        defaultSorted={[{
          id: 'walker',
          desc: false
        }]}
        columns={[{
          columns: [
            {
              accessor: d => (d.first_name + ' ' + d.last_name),
              className: 'text strong',
              Cell: ({ value }) => <div className='cell'>
                {/* <div className='customer-picture-cell'>
                  <img className='img-circle' src={customerProfilePic} />
                </div> */}
                <span className='text strong'>{value}</span>
              </div>,
              id: 'walker',
              label: 'WALKER',
              maxWidth: 220
            },
            {
              accessor: 'phone_mobile',
              className: 'text',
              label: 'MOBILE PHONE',
              maxWidth: 110
            },
            // {
            //   accessor: 'phone_home',
            //   className: 'text',
            //   label: 'HOME PHONE',
            //   maxWidth: 110
            // },
            // {
            //   accessor: 'phone_work',
            //   className: 'text',
            //   label: 'WORK PHONE',
            //   maxWidth: 110
            // },
            {
              accessor: 'username',
              className: 'text',
              label: 'USERNAME (EMAIL)'
            },
            {
              accessor: 'address',
              className: 'text',
              label: 'ADDRESS',
              maxWidth: 200
            }
          ]
        }]}
      />}
      {!loading && walkers.length === 0 && <div className='empty'>
        <CenteredTextNotify icon='ion-ios-checkmark' text={`No Staff`} />
      </div>}
    </div>
  }
}

let mapStateToProps = (state, ownProps) => {
  const userType = sessionController.selectUserType(state)

  return {
    walkers: state.walkers.walkers,
    walkersIsLoading: state.walkers.loading,
    userType
  }
}

export default connect(mapStateToProps)(Walkers)
