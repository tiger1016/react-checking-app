// Libraries
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

// History
import history from 'Utils/history'

// Actions
import destroySession from 'Actions/session/destroySession'
import toggleModal from 'Actions/app/toggleModal'

// Components
import Menu from '../../custom-react-menu/Menu'
import MenuTrigger from '../../custom-react-menu/MenuTrigger'
import MenuOptions from '../../custom-react-menu/MenuOptions'
import MenuOption from '../../custom-react-menu/MenuOption'

// Styles
import 'react-select/dist/react-select.css'
import './index.css'

// Controller
import { appController } from 'Controllers/appController'
import { routerController } from 'Controllers/routerController'
import { sessionController } from 'Controllers/sessionController'

// Utils
import { api } from 'Utils/api'

// Components
import NavHeaderNavigation from './components/NavHeaderNavigation'

// Assets
import ProfileImage from 'Assets/blank-profile-picture.png'

const MenuImage = ({
  openMenu,
  pathnameRoot,
  profilePic,
  userFirstName,
  userLastName
}) => (
  <div style={{ display: 'flex' }}>
    <span className='profile-name'>{userFirstName + ' ' + userLastName}</span>
    <span onMouseEnter={openMenu} className='profile-pic-container' style={{ borderColor: pathnameRoot === 'profile' ? 'transparent' : 'transparent' }}>
      <img className='profile-pic' src={profilePic || ProfileImage} />
    </span>
  </div>
)
class NavHeader extends React.Component {
  state = {
    online: false
  }

  networkDaemonId = null
  networkDaemonIntervalLengthInMinutes = 0.1

  componentDidMount () {
    this.startNetworkStatusDaemon()
  }

  componentWillUnmount () {
    this.stopNetworkStatusDaemon()
  }

  startNetworkStatusDaemon = () => {
    this.stopNetworkStatusDaemon()
    this.networkDaemonId = setInterval(() => {
      this.fetchNetworkStatus()
    }, this.networkDaemonIntervalLengthInMinutes * 60000)
  }

  stopNetworkStatusDaemon = () => {
    clearInterval(this.networkDaemonId)
  }

  fetchNetworkStatus = async () => {
    try {
      const { data: { online } } = await api.get('/network', {}, false)
      this.setState({ online })
    } catch (error) {
      if (error) this.setState({ online: false })
    }
  }

  openModal = () => {
    this.props.toggleModal({
      canClose: true,
      data: { url: this.props.location.pathname },
      isOpen: true,
      modalIdentifier: appController.constants.SEND_FEEDBACK_MODAL_IDENTIFIER
    })
  }

  logout = () => {
    this.props.destroySession()
    history.push('/')
  }

  render () {
    const {
      location: { pathname },
      navBarFor,
      unreadAlerts,
      userType
    } = this.props
    const { online } = this.state

    const active = '#1875F0'
    const pathnameRoot = routerController.getPathnameRoot(pathname)

    return <div className='NavHeader'>
      <div className='left-header'>
        {pathnameRoot === 'scheduler' && <NavHeaderNavigation
          pathnameRoot={pathnameRoot}
          navBarFor={navBarFor}
        />}
      </div>
      <div className='right-header'>
        <div>
          <ReactTooltip id='network-tt' effect='solid' place={'bottom'} />
          <div data-tip={online ? 'Online' : 'Offline'} data-for='network-tt'
            className={classNames(['ion-wifi', 'icon', online ? 'online' : 'offline'])}
          />
          {!online && <div className='offline-strike' />}
        </div>
        <div>
          <div
            onClick={this.openModal}
            className='ion-android-alert icon touchable'
          />
        </div>
        <Link to='/alerts'>
          <div className='notifications'>
            <div className={classNames([
              'ion-android-notifications',
              'icon',
              'touchable'
            ])} />
            {!!unreadAlerts && <span className='badge'>{unreadAlerts}</span>}
          </div>
        </Link>
        <Link to='/settings' className='setting-link'>
          <div>
            <div className={classNames([
              'ion-android-settings',
              'icon',
              'touchable',
              pathnameRoot === 'settings' && 'active'])}
            />
          </div>
        </Link>
        <span className='clearfix' />
        <Menu className='myMenu' right>
          <MenuTrigger>
            <MenuImage pathnameRoot={pathnameRoot} active={active} {...this.props} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption>
              <Link to='/profile/profile-information'>
                <i className='ion-person' /> &nbsp;<span> Profile</span>
              </Link>
            </MenuOption>
            {
              userType === 'full_scheduling_admin' ? <MenuOption>
                <Link to='/profile/licensee_profile'>
                  <i className='ion-person' /> &nbsp;<span> Licensee Profile</span>
                </Link>
              </MenuOption> : null
            }
            <MenuOption onSelect={this.logout}>
              <i className='ion-android-exit' /> &nbsp;<span> Logout</span>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </div>
    </div>
  }
}

NavHeader.propTypes = {
  online: PropTypes.bool,
  navBarFor: PropTypes.string,
  profilePic: PropTypes.string,
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string
}

const mapStateToProps = state => {
  const selectUser = sessionController.selectUser(state)
  const profilePic = selectUser.profile_pic
  const userFirstName = selectUser.first_name
  const userLastName = selectUser.last_name
  const userType = sessionController.selectUserType(state)
  return {
    alerts: state.alerts.alerts.total || [],
    online: state.network.online,
    profilePic,
    userFirstName,
    userLastName,
    unreadAlerts: state.alerts.unreadAlerts,
    userType
  }
}

const mapDispatchToProps = {
  destroySession,
  toggleModal
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavHeader))
