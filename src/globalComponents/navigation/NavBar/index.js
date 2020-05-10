// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// Actions
import fetchCompanyLogo from 'Actions/profile/fetchCompanyLogo'
import updateLogo from 'Actions/profile/updateLogo'

// Controllers
import { appController } from 'Controllers/appController'
import { navigationController } from 'Controllers/navigationController'

// Styles
import './index.css'

// Assets
import logoImage from 'Assets/PetCheck_logo.png'
import loading from 'Assets/uploading.gif'

// Components
import NavButton from './components/NavButton'

const photoBaseURL = appController.getAssetsUrl() + 'logos/'

const CustomNavLink = props => <Link to={props.route.route}>
  <NavButton
    active={props.currentPathname && props.route.route.split('?')[0].includes(props.currentPathname)}
    icon={props.route.icon}
    id={`NavBar-Link-To-${props.route.name}`}
    navButton={props.route.name}
    route={props.route.route}
    unreadAlerts={props.route.name === 'Alerts' && props.unreadAlerts}
  />
</Link>

class NavBar extends React.Component {
  componentDidMount () {
    this.props.fetchCompanyLogo()
  }

  handleLogoAdd = (e) => {
    if (e.target.files) { this.props.updateLogo(e.target.files[0]) }
  }

  render () {
    const { loadingLogo, location, logo, navBarFor, unreadAlerts } = this.props
    let { pathname } = location
    const temppathArray = pathname.split('/')
    if (temppathArray.length >= 1) {
      pathname = temppathArray[0] + temppathArray[1]
    }

    if (navBarFor === 'customer' || navBarFor === 'walker') {
      pathname = (pathname === '/' || pathname === '') ? '/scheduler' : pathname
    } else {
      pathname = (pathname === '/' || pathname === '') ? '/dashboard' : pathname
    }

    const routes = navigationController.navBarRoutes(navBarFor)

    // Fixed nav bar links
    const fixedRoutes = routes.filter(r => !r.hidden && r.fixed)

    // Scrollable nav bar links
    const scrollableRoutes = routes.filter(r => !r.hidden && !r.fixed)

    return <div className='NavBar'>
      <div className='nav-bar-header'>
        <div className='nav-bar-logo'>
          {!loadingLogo && <img className='bitmap' src={logo ? photoBaseURL + logo : logoImage} />}
          {loadingLogo && <img className='loading' src={loading} />}
        </div>
        <input className='fileinput' id='profile-logo' type='file' accept='image/x-png,image/gif,image/jpeg' onChange={(e) => this.handleLogoAdd(e)} />
        <label htmlFor='profile-logo' className='add-your-logo'>{logo ? 'change logo' : '+ add your logo'}</label>
      </div>
      <div className='nav-bar-container'>
        {fixedRoutes.map((r, i) => <CustomNavLink route={r} key={i} currentPathname={pathname} />)}
        <div className='scrollable'>
          {scrollableRoutes.map((r, i) => <CustomNavLink route={r} key={i} currentPathname={pathname} unreadAlerts={unreadAlerts} />)}
        </div>
      </div>
    </div>
  }
}

NavBar.propTypes = {
  loadingLogo: PropTypes.bool.isRequired,
  logo: PropTypes.string
}

const mapStateToProps = state => {
  const loadingLogo = state.profile.loadingLogo
  const logo = state.profile.profile.logo
  return {
    loadingLogo,
    logo,
    unreadAlerts: state.alerts.unreadAlerts
  }
}

const mapDispatchToProps = {
  fetchCompanyLogo,
  updateLogo
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
