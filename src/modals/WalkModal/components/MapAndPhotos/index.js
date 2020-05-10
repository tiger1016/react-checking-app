// libraries
import React from 'react'
import GoogleMapReact from 'google-map-react'
import _ from 'lodash'
import Slider from 'react-slick'
import { connect } from 'react-redux'

// Controllers
import {
  photosController,
  walksController
} from 'Controllers'

// Actions
import fetchMapOfWalk from 'Actions/maps/fetchMapOfWalk'

// Components
import CostSummary from '../CostSummary'

// Styles
import './index.css'

/*
  var cf = 20
  return <div style={{width: cf + 'px', height: cf + 'px', borderRadius: cf + 'px', backgroundColor: '#1e767a'}}>
    <span style={{width: cf + 'px', height: cf + 'px', borderRadius: cf + 'px', lineHeight: cf + 'px', color: '#FFF', textAlign: 'center', display: 'block'}}>{props.index}</span>
  </div>
*/

const MapMarker = props => {
  return <i className='ion-ios-paw' style={{ color: '#1e767a', fontSize: '18px' }} />
}

class MapAndPhotos extends React.Component {
  static defaultProps = {
    defaultCenter: { lat: 59.95, lng: 30.33 },
    zoom: 20
  }
  componentWillMount () {
    const {
      app,
      fetchMapOfWalk
    } = this.props
    fetchMapOfWalk(app.modal.data.walk.walk_id)
    photosController.actions.fetchPhotosOfWalk(app.modal.data.walk.walk_id)
  }
  /**
   * Returns cost of all addons plus all services selected
   * @return {Number} Total costs.
   */
  getTotalCosts = () => Number(this.getTotalAddonsCost(this.state.selectedAddons) + this.getTotalServicesCost(this.state.selectedService))
  /**
   * Returns total cost of all addons selected
   * @param  {Array} selectedAddons Selected Addons
   * @return {Number}               Total addons cost
   */
  getTotalAddonsCost = selectedAddons => {
    let {
      addons
    } = this.props

    let walkAddons = _.filter(addons.addons, a => _.includes(selectedAddons, a.id))
    let totalCost = 0
    walkAddons.forEach(a => {
      if (a && a.addon_price) totalCost += Number(a.addon_price)
    })
    return totalCost || 0
  }
  /**
   * Returns cost service selected (can only select one)
   * @param  {Object} selectedService Selected service
   * @return {Number}                 Service cost
   */
  getTotalServicesCost = selectedService => (selectedService && selectedService.cost ? selectedService.cost : 0)
  render () {
    let {
      addons,
      app,
      defaultCenter,
      maps,
      photos,
      services
    } = this.props

    let walk = app.modal.data.walk

    let walkMap = _.find(maps.walk_maps, m => Number(m.walk_id) === Number(walk.walk_id))
    walkMap = walkMap ? walkMap.map_data.data.points : []

    let walkPhotos = _.find(photos.walk_photos, p => Number(p.walk_id) === Number(walk.walk_id))
    walkPhotos = walkPhotos && walkPhotos.photos ? walkPhotos.photos : []

    let walkMapCenter = {
      lat: parseFloat(walkMap && walkMap[0] ? walkMap[0].lat : 59.95),
      lng: parseFloat(walkMap && walkMap[0] ? walkMap[0].long : 30.33)
    }

    return <div id='MapAndPhotos'>
      <div className='container'>
        {walkPhotos && walkPhotos.length ? <div className='photos-area-container'>
          <div className='photos-title-container'>
            <span className='title'>In-service Photos</span>
          </div>
          <div className='photo-gallery-container'>
            <Slider className='photo-gallery-slider' adaptiveHeight autoplay>
              {walkPhotos.map((p, i) => <div key={i} className='photo-container'>
                <img className='photo' src={p.path} />
              </div>)}
            </Slider>
          </div>
        </div> : null}
        <div className='map-container'>
          <div className='maps-title-container'>
            <span className='title'>Maps</span>
          </div>
          <GoogleMapReact
            defaultCenter={defaultCenter}
            defaultZoom={16}
            center={walkMapCenter}
            onGoogleApiLoaded={m => console.log('onGoogleApiLoaded', m)}
            yesIWantToUseGoogleMapApiInternals
          >
            {walkMap.map((p, index) => <MapMarker
              lat={p.lat}
              lng={p.long}
              time={p.ts}
              key={index}
              index={index}
            />)}
          </GoogleMapReact>
        </div>
        <div className='comment-and-photos-container'>
          <div className='comment-and-photos-inner-container'>
            <div className='comment-container'>
              <div className='pet-area-container'>
                <span className='pet-names'>{_.isArray(walk.pets) ? walk.pets.map(p => p.name).join(', ') : walk.pets}</span>
                {walksController.getStatus(walk) === 'completed' ? <span className='pee-poo-icon-container'><img style={{ height: '18px' }} src={require('../../assets/pee.png')} /></span> : null}
                {walksController.getStatus(walk) === 'completed' ? <span className='pee-poo-icon-container'><img style={{ height: '18px' }} src={require('../../assets/poo.png')} /></span> : null}
              </div>
              {walk.walker_comments ? <div className='comments-title-container'>
                <span className='comments-title'>Walker Comments</span>
              </div> : null}
              {walk.walker_comments ? <div className='comments'>
                <p /* style={{maxHeight: '176px', overflow: 'auto'}} */>{walk.walker_comments || ''}</p>
              </div> : null}
            </div>
            <CostSummary
              addons={addons}
              getTotalAddonsCost={this.getTotalAddonsCost}
              getTotalCosts={this.getTotalCosts}
              getTotalServicesCost={this.getTotalServicesCost}
              isEditModal={() => true}
              selectedAddons={walk.addons}
              selectedService={_.find(services.services, s => s.id === walk.billing_price_group_id)}
              walk={walk}
            />
          </div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    addons: state.addons,
    app: state.app,
    maps: state.maps,
    photos: state.photos,
    services: state.services
  }
}

const mapDispatchToProps = {
  fetchMapOfWalk
}

export default connect(mapStateToProps, mapDispatchToProps)(MapAndPhotos)
