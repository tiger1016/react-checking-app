// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import PropTypes from 'prop-types'

// Config
import loadableConfig from 'Config/loadable.config'

// Styles
import './index.css'

// Components
import FullScreenTextOnly from 'GlobalComponents/FullScreenTextOnly'

// Controllers
import { appController, walkersController, sessionController } from 'Controllers'

const LoadingComponent = props => {
  return <FullScreenTextOnly text='Loading' spinner />
}
const _loadableConfig = {
  ...loadableConfig,
  loading: LoadingComponent
}
const WalkerProfile = Loadable({
  ..._loadableConfig,
  loader: () => import('./WalkerProfile')
})
const PayrollReport = Loadable({
  ..._loadableConfig,
  loader: () => import('./PayrollReport')
})
// const PayRates = Loadable({
//   ..._loadableConfig,
//   loader: () => import('./PayRates')
// })
const Button = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/Button')
})
const Loader = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/Loader')
})
const NavTab = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/navigation/NavTab')
})
const SectionBody = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/SectionBody')
})
const SectionHeader = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/SectionHeader')
})
const Switch = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/input/Switch')
})

class Walker extends React.Component {
  componentWillMount () {
    const { walkersExists } = this.props
    appController.actions.openSideBar()
    if (!walkersExists) {
      walkersController.actions.fetchWalkers()
    }
  }

  toggleProfileStatus = () => {
    const { walkerActive, walkerId } = this.props
    walkersController.actions.toggleWalkerProfileStatus(walkerId, walkerActive ? 0 : 1)
    appController.closeAlert()
  }

  toggleActionClicked = () => {
    const { walkerActive, walkerFirstName, walkerLastName } = this.props
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        onConfirm: () => this.toggleProfileStatus(),
        onCancel: () => appController.closeAlert(),
        onKeyDown: () => appController.closeAlert(),
        show: true,
        showCancelButton: true,
        title: walkerActive ? 'Activate Walker' : 'Deactivate walker',
        text: walkerActive ? 'Are you sure you want to Activate ' + walkerFirstName + ' ' + walkerLastName : 'Are you sure you want to Deactivate ' + walkerFirstName + ' ' + walkerLastName,
        type: 'warning'
      }
    })
  }

  rightHeaderComponent = props => <div className='headerRightComponent'>
    <div className='header-action-label'>{this.props.walkerActive === 0 ? 'Inactive' : 'Active'}</div>
    <Switch checked={this.props.walkerActive !== 0} name='active' noText onChange={this.toggleActionClicked} />
    <Link to={'/scheduler/week?walkers[]=' + this.props.walkerId}><Button textOnly iconOnly='ion-calendar' /></Link>
  </div>

  leftAction = props => <div className='go-back'>
    <Link to='/walkers'><Button size={'large'} textOnly iconOnly='ion-arrow-left-c' /></Link>
  </div>

  render () {
    const {
      walkerId,
      walkersLoading,
      walkerFirstName,
      walkerLastName,
      location,
      userType,
      // isPartialAdmin,
      isSelfWalker
    } = this.props

    if (!walkerId && walkersLoading) {
      return <div id='Walker' className='loading'>
        <Loader />
      </div>
    }

    if (!walkerId) return null

    const walkerRoot = `/walker/${walkerId}`
    let routes = ((userType !== 'scheduling_admin') || isSelfWalker) ? [
      {
        component: WalkerProfile,
        index: true,
        path: `${walkerRoot}/profile`,
        title: 'Staff Profile'
      },
      {
        component: PayrollReport,
        path: `${walkerRoot}/payrolls`,
        title: 'Payroll Reports'
      }
      // {
      //   hide: isPartialAdmin,
      //   component: PayRates,
      //   path: `${walkerRoot}/payrates`,
      //   title: 'Pay Rates'
      // }
    ] : [
      {
        component: WalkerProfile,
        index: true,
        path: `${walkerRoot}/profile`,
        title: 'Walker Profile'
      }
      // {
      //   hide: isPartialAdmin,
      //   component: PayRates,
      //   path: `${walkerRoot}/payrates`,
      //   title: 'Pay Rates'
      // }
    ]
    routes = routes.filter(f => !f.hide)

    return (
      <div id='Walker'>
        <SectionHeader leftAction={this.leftAction}
          title={`${walkerFirstName} ${walkerLastName}`}
          rightComponent={this.rightHeaderComponent()}
        />
        <NavTab id='Walker-NavTab' routes={routes} />
        <SectionBody noPadding={/profile$/.test(location.pathname) || /\d+\/*$/.test(location.pathname)}>
          <Route exact path={walkerRoot}
            component={props => <WalkerProfile
              walkerId={walkerId}
              {...props}
            />}
          />
          {routes.map((route, i) => <Route
            key={i}
            path={route.path}
            component={props => <route.component
              walkerId={walkerId}
              {...props}
            />}
          />)}
        </SectionBody>
      </div>
    )
  }
}

Walker.propTypes = {
  isSelfWalker: PropTypes.bool,
  userType: PropTypes.string.isRequired,
  walkerFirstName: PropTypes.string.isRequired,
  walkerId: PropTypes.string.isRequired,
  walkerLastName: PropTypes.string.isRequired,
  walkersExists: PropTypes.bool.isRequired,
  walkersLoading: PropTypes.bool
}

const mapStateToProps = (state, props) => {
  const { match: { params: { id: walkerId } } } = props
  const walkersExists = !!state.walkers.walkers.length
  const walker = walkersExists ? state.walkers.walkers.find(c => Number(c.user_id) === Number(walkerId)) : null
  const userId = sessionController.selectUser(state).user_id

  return {
    walkerActive: walker.active,
    walkerFirstName: walker.first_name,
    walkerId,
    walkerLastName: walker.last_name,
    walkersExists,
    walkersLoading: state.walkers.loading,
    userType: sessionController.selectUserType(state),
    isPartialAdmin: sessionController.isPartialAdmin(state),
    isSelfWalker: !!(userId && (Number(userId) === Number(walkerId)))
  }
}

export default withRouter(connect(mapStateToProps)(Walker))
