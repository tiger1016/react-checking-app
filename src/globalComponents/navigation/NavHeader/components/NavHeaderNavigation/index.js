// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// Actions
import updateLogo from 'Actions/profile/updateLogo'

// Controllers
import { appController } from 'Controllers/appController'
import { navigationController } from 'Controllers/navigationController'

// Styles
import './index.css'

// Assets
import loading from 'Assets/uploading.gif'
import logoImage from 'Assets/PetCheck_logo.png'

const photoBaseURL = appController.getAssetsUrl() + 'logos/'

class NavHeaderNavigation extends Component {
  createLink = (route, index, currentPathname) => <Link
    id={`NavHeaderNavigation-Link-To-${route.name}`}
    className={`NavHeaderNavigation-Link${currentPathname === route.route ? ' active' : ''}`}
    key={index}
    to={route.route}>
    <span>{route.name}</span>
  </Link>

  handleLogoAdd = e => {
    if (e.target.files) { this.props.updateLogo(e.target.files[0]) }
  }

  render () {
    const { location, logo, loadingLogo, navBarFor } = this.props
    let { pathname } = location

    if (navBarFor === 'customer' || navBarFor === 'walker') {
      pathname = pathname === '/' ? '/scheduler' : pathname
    } else {
      pathname = pathname === '/' ? '/dashboard' : pathname
    }
    const routes = navigationController.navBarRoutes(navBarFor)

    return <div className='NavHeaderNavigation'>
      <div className='nav-header-logo'>
        {!loadingLogo && <img className='bitmap' src={logo ? photoBaseURL + logo : logoImage} />}
        {loadingLogo && <img className='loading' src={loading} />}
        <input className='fileinput' id='profile-logo' type='file' accept='image/x-png,image/gif,image/jpeg' onChange={(e) => this.handleLogoAdd(e)} />
        <label htmlFor='profile-logo' className='add-your-logo'>{logo ? 'change logo' : '+ add your logo'}</label>
      </div>
      {routes.map((r, i) => this.createLink(r, i, pathname))}
    </div>
  }
}

NavHeaderNavigation.propTypes = {
  logo: PropTypes.string,
  loadingLogo: PropTypes.bool,
  navBarFor: PropTypes.string
}

const mapStateToProps = state => {
  const loadingLogo = state.profile.loadingLogo
  const logo = state.profile.profile.logo
  return {
    logo,
    loadingLogo
  }
}

const mapDispatchToProps = {
  updateLogo
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavHeaderNavigation))
