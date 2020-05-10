// Libraries
import React from 'react'
import PropTypes from 'prop-types'

// Controllers
import { appController } from 'Controllers'

// Utils
import { utility } from 'Utils'

// Styles
import './index.css'

// Assets
import placeholderPicture from 'Assets/blank-profile-picture.png'

// Components
import Img from 'GlobalComponents/Img'

class PetsCell extends React.Component {
  onClick = (e, p) => {
    const { customerId, goToPet } = this.props
    goToPet(e, customerId, p.name)
  }

  petPhotoUrl = pet => {
    const { customerPhotoId } = this.props
    const photoBaseURL = appController.getAssetsUrl()
    if (pet.photo) return photoBaseURL + 'pets/' + customerPhotoId + '/' + pet.photo
    return placeholderPicture
  }

  render () {
    let { pets } = this.props
    pets = pets || []

    if (utility.isAnArray(pets)) {
      return <div className='multiple'>
        {pets.map((p, i) => <div onClick={e => this.onClick(e, p)} className='PetsCell' key={i}>
          <Img className='pet-circle-img' src={this.petPhotoUrl(p)} />
          <span className='pet-name'>{p.name || `No Name for pet ${p.id}`}</span>
        </div>)}
      </div>
    }

    if (utility.isAnObject(pets) && !utility.isEmpty(pets)) {
      return <div className='PetsCell'>
        <Img className='pet-circle-img' src={this.petPhotoUrl(pets)} />
        <span className='pet-name'>{pets.name || `No name for pet ${pets.id}`}</span>
      </div>
    }

    return null
  }
}

PetsCell.propTypes = {
  customerId: PropTypes.string.isRequired,
  customerPhotoId: PropTypes.string,
  goToPet: PropTypes.func
}

export default PetsCell
