// Libraries
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Controllers
import { appController } from 'Controllers/appController'
import { petsController } from 'Controllers/petsController'

// Components
import Button from 'GlobalComponents/Button'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'
import CustomerPetsRight from './CustomerPetsRight'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Styles
import './index.css'

class CustomerPets extends React.PureComponent {
  openAddPetModal = () => {
    const { customerId } = this.props
    appController.actions.toggleModal({
      canClose: true,
      data: { custid: customerId },
      isOpen: true,
      modalIdentifier: appController.constants.ADD_PET_MODAL_IDENTIFIER
    })
  }
  render () {
    const {
      customerId,
      pets
    } = this.props
    return <div id='CustomerPets'>
      <SectionHeader
        title='Pets'
        noPadding
        rightComponent={<Button
          onClick={this.openAddPetModal}
          round
          text='Add Pet'
        />}
      />
      {pets && pets.map((pet, i) => <CustomerPetsRight
        customerId={customerId}
        key={i}
        petId={pet.id}
      />)}
      {(!pets || pets.length === 0) && <div className='empty'>
        <CenteredTextNotify
          icon='ion-ios-checkmark'
          text={`No pets`}
        />
      </div>}
    </div>
  }
}

CustomerPets.propTypes = {
  customerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
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
    pets
  }
}

export default connect(mapStateToProps)(CustomerPets)
