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

// Styles
import './index.css'
import './slick.min.css'
import './slick-theme.min.css'
/*
  var cf = 20
  return <div style={{width: cf + 'px', height: cf + 'px', borderRadius: cf + 'px', backgroundColor: '#1e767a'}}>
    <span style={{width: cf + 'px', height: cf + 'px', borderRadius: cf + 'px', lineHeight: cf + 'px', color: '#FFF', textAlign: 'center', display: 'block'}}>{props.index}</span>
  </div>
*/

const MapMarker = props => <i className='ion-ios-paw' style={{ color: '#1e767a', fontSize: '18px' }} />

class MapAndPhotos extends React.Component {
  static defaultProps = {
    defaultCenter: { lat: 41.8781, lng: 87.6298 },
    zoom: 10
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
    const {
      app,
      defaultCenter,
      maps,
      photos
    } = this.props

    const walk = app.modal.data.walk

    let walkMap = _.find(maps.walk_maps, m => Number(m.walk_id) === Number(walk.walk_id))
    walkMap = walkMap ? walkMap.map_data.data.points : []

    let walkPhotos = _.find(photos.walk_photos, p => Number(p.walk_id) === Number(walk.walk_id))
    walkPhotos = walkPhotos && walkPhotos.photos ? walkPhotos.photos : []
    const isMapFetched = walkMap && walkMap[0]
    const walkMapCenter = {
      lat: parseFloat(walkMap && walkMap[0] ? walkMap[0].lat : 41.8781),
      lng: parseFloat(walkMap && walkMap[0] ? walkMap[0].long : -87.6298)
    }

    return <div id='MapAndPhotos'>
      <div className='container'>
        <div className='map-container'>
          {isMapFetched &&
          <GoogleMapReact
            defaultCenter={defaultCenter}
            defaultZoom={15}
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
          }
        </div>
        {walksController.getStatus(walk) === 'completed' && walkPhotos && walkPhotos.length ? <div className='photos-area-container'>
          <div className='photos-title-container'>
            <span className='title'>In-service Photos</span>
          </div>
          <div className='photo-gallery-container'>
            <Slider className='photo-gallery-slider' autoplay>
              {walkPhotos.map((p, i) => <div key={i} className='photo-container'>
                <img className='photo' src={p.path} />
              </div>)}
            </Slider>
          </div>
        </div> : null}
        {/* <div className='comment-and-photos-container'>
          <div className='comment-and-photos-inner-container'>
            <div className='comment-container'>
              <div className='pet-area-container'>
                <span className='pet-names'>{walk.pets.map(p => p.name).join(', ')}</span>
                {walksController.getStatus(walk) === 'completed' ? <span className='pee-poo-icon-container'><img style={{height: '18px'}} src={require('../../../../assets/pee.png')} /></span> : null}
                {walksController.getStatus(walk) === 'completed' ? <span className='pee-poo-icon-container'><img style={{height: '18px'}} src={require('../../../../assets/poo.png')} /></span> : null}
              </div>
              {walk.walker_comments ? <div className='comments-title-container'>
                <span className='comments-title'>Walker Comments</span>
              </div> : null}
              {walk.walker_comments ? <div className='comments'>
                <p>{walk.walker_comments || ''}</p>
              </div> : null}
            </div>
          </div>
        </div> */}
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
