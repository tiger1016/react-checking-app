// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Controllers
import { appController } from 'Controllers/appController'
import { petsController } from 'Controllers/petsController'

// Assets
import placeholder from 'Assets/blank-profile-picture.png'

// Components
import SectionBody from 'GlobalComponents/SectionBody'
import Img from 'GlobalComponents/Img'

// Styles
import './index.css'

class CustomerProfileLeft extends React.PureComponent {
  checkPetPhotoExist (pet) {
    return !(pet.photo === undefined || pet.photo.length === 0 || pet.photo === '.')
  }
  render () {
    const {
      customerId,
      customerPhotoId,
      pets
    } = this.props

    const photoBaseURL = appController.getAssetsUrl() + 'pets/' + customerPhotoId
    if (!pets || !pets.length) return null

    return <div className='CustomerProfileLeft'>
      <SectionBody>
        <div className='images-container'>
          {pets.map((p, i) => <Link to={'/customer/' + customerId + '/pets#' + p.name.replace(' ', '')} key={i} className='no-decoration'><div className='pet' >
            <div className='image-container'>
              <Img src={this.checkPetPhotoExist(p) ? photoBaseURL + '/' + p.photo : placeholder} />
            </div>
            <div className='pet-name'>{p.name}</div>
          </div></Link>)}
        </div>
      </SectionBody>
    </div>
  }
}

CustomerProfileLeft.propTypes = {
  customerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  customerPhotoId: PropTypes.number,
  pets: PropTypes.array
}

const mapStateToProps = (state, props) => {
  const { customerId } = props

  let customer = state.customers.customers.find(c => `${c.user_id}` === `${customerId}`)
  if (!customer) {
    customer = state.customers.customers.find(c => `${c.walker_id}` === `${customerId}`)
  }
  const pets = petsController.selectPetsForSpecificCustomer(state, customer.user_id)

  return {
    customerPhotoId: customer.customer_photo_id,
    pets
  }
}

export default connect(mapStateToProps)(CustomerProfileLeft)
