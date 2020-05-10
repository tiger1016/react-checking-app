// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Assets
import placeholder from 'Assets/blank-profile-picture.png'

// Controllers
import { appController } from 'Controllers/appController'
import { petsController } from 'Controllers/petsController'

// Components
import Button from 'GlobalComponents/Button'
import DataDisplay from 'GlobalComponents/DataDisplay'
import ImageUploader from 'GlobalComponents/ImageUploader'
import Img from 'GlobalComponents/Img'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionBody from 'GlobalComponents/SectionBody'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Styles
import './index.css'

class CustomerPetsRight extends React.PureComponent {
  state = {
    errors: [],
    treats: this.props.treats,
    pet: new (petsController.petStructGenerator())(this.props),
    petRev: new (petsController.petStructGenerator())(this.props)
  }

  rightHeaderComponent = props => <div className='headerRightComponent'>
    <Button onClick={this.toggleEdit} textOnly iconOnly='ion-edit' />
    <Button onClick={this.deleteActionClicked} textOnly iconOnly='ion-trash-b' />
  </div>

  isStateChanged = () => !_.isEqual(this.state.pet, this.state.petRev)

  toggleEdit = () => {
    const { petRev } = this.state
    const { isEditing } = this.props
    if (isEditing) {
      if (this.isStateChanged()) {
        appController.confirmDiscardChanges(() => this.setState({
          pet: new (petsController.petStructGenerator())(petRev)
        }, () => petsController.actions.updatePetProfileEditState(false)))
      } else {
        // this.setState({ isEditing: false })
        petsController.actions.updatePetProfileEditState(false)
      }
    } else {
      // this.setState({ isEditing: true })
      petsController.actions.updatePetProfileEditState(true)
    }
  }

  deleteActionClicked = () => {
    const { petId } = this.props
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        format: 'confirm-delete',
        onConfirm: () => { petsController.actions.deletePet(petId); appController.closeAlert() },
        onCancel: () => appController.closeAlert(),
        onKeyDown: () => appController.closeAlert(),
        show: true,
        showCancelButton: true,
        text: 'Are you sure you want to delete this Pet?',
        type: 'warning'
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      pet: new (petsController.petStructGenerator())(nextProps),
      petRev: new (petsController.petStructGenerator())(nextProps)
    })
  }

  handleInputValidate = ({ name, error }) => {
    const { errors } = this.state
    if (error && !errors.filter(e => e.name === name).length) {
      this.setState({ errors: [ ...errors, { name, error } ] })
    } else if (!error) {
      this.setState({ errors: errors.filter(e => e.name !== name) })
    }
  }

  handleInputChange = item => {
    const { pet } = this.state
    this.setState({
      pet: {
        ...pet,
        [item.target.name]: item.target.value
      }
    })
  }

  handleImageChange = files => {
    const pet = Object.assign({}, this.state.pet)
    if (files && files.length > 0) {
      pet.photo = files[0]
    } else {
      delete pet.photo
    }
    this.setState({ pet })
  }

  handleGenderChange = ({ value }) => {
    const { pet } = this.state
    this.setState({
      pet: {
        ...pet,
        gender: value
      }
    })
  }

  handleEnergyLevelChange = ({ value }) => {
    const { pet } = this.state
    this.setState({
      pet: {
        ...pet,
        energy_level: value
      }
    })
  }

  handleBreedChange = ({ value }) => {
    const { pet } = this.state
    this.setState({
      pet: {
        ...pet,
        breed_id: value
      }
    })
  }

  handleBirthdayChange = date => {
    const { pet } = this.state
    this.setState({
      pet: {
        ...pet,
        birthday: date.format('YYYY-MM-DD')
      }
    })
  }

  handleRabiesExpirationChange = date => {
    const { pet } = this.state
    this.setState({
      pet: {
        ...pet,
        rabies_expiration: date.format('YYYY-MM-DD')
      }
    })
  }

  handleDogAgressionChange = ({ value }) => {
    const { pet } = this.state
    this.setState({
      pet: {
        ...pet,
        aggression_towards_dogs: value
      }
    })
  }

  handleHumansAgressionChange = ({ value }) => {
    const { pet } = this.state
    this.setState({
      pet: {
        ...pet,
        aggression_towards_humans: value
      }
    })
  }

  handleVetStateChange = ({ value }) => {
    const { pet } = this.state
    this.setState({
      pet: {
        ...pet,
        vet_state: value
      }
    })
  }

  handleTreatsChange = ({ value: treats }) => {
    this.setState({ treats }, () => {
      if (treats === 0) {
        this.setState({ ...this.state.pet, treats: '' })
      }
    })
  }

  checkPetPhotoExist = pet => !(pet.photo === undefined || pet.photo.length === 0 || pet.photo === '.')

  updateClick = () => {
    const { customerId, petId } = this.props
    const { pet } = this.state
    petsController.actions.updatePet(
      customerId,
      { ...pet, id: petId },
      (error, newPet) => { if (!error) petsController.actions.updatePetProfileEditState(false) }
    )
  }

  render () {
    const { customerPhotoId, isEditing } = this.props
    const { errors, pet, treats } = this.state
    const photoBaseURL = appController.getAssetsUrl() + 'pets/' + customerPhotoId
    const breedId = pet.breed ? (pet.breed.id || pet.breed_id) : pet.breed_id
    const breedName = pet.breed ? (pet.breed.name || petsController.selectPetBreedNameById(pet.breed.id || breedId)) : petsController.selectPetBreedNameById(breedId)

    return <div id={pet.name.replace(' ', '')} className='pet-container' >
      {pet && <div className='CustomerPetsLeft'>
        <SectionBody noHPadding>
          <div className='images-container'>
            {!isEditing && <div className='pet'>
              <div className='image-container'>
                <Img src={this.checkPetPhotoExist(pet) ? photoBaseURL + '/' + pet.photo : placeholder} />
              </div>
            </div>}
            {isEditing && <div className='image-container'>
              <ImageUploader
                image={this.checkPetPhotoExist(pet) ? photoBaseURL + '/' + pet.photo : placeholder}
                uploadBtn
                sizeInfo='max 1mb, 640 x 480'
                multiple={false}
                onChange={(files) => this.handleImageChange(files, 'photo')}
              />
            </div>}
          </div>
        </SectionBody>
      </div>}
      <div className='CustomerPetsRight'>
        <SectionBody>
          <SectionHeader title={pet.name || ''} noPadding rightComponent={this.rightHeaderComponent()} />
          <div className='data-display-container'>
            <DataDisplay edit={isEditing} items={[
              {
                label: 'Name',
                name: 'name',
                onChange: this.handleInputChange,
                required: true,
                value: pet.name
              },
              {
                label: 'Type',
                name: 'type',
                onChange: this.handleInputChange,
                value: pet.type
              },
              {
                label: 'Breed',
                name: 'breed_id',
                onChange: this.handleBreedChange,
                value: pet.breed_id,
                type: 'petBreed-select',
                displayAs: breedName
              },
              {
                label: 'Gender',
                name: 'gender',
                onChange: this.handleGenderChange,
                type: 'gender',
                value: pet.gender
              },
              {
                label: 'Color',
                name: 'color',
                onChange: this.handleInputChange,
                value: pet.color
              },
              {
                label: 'Weight',
                name: 'weight',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'number',
                value: pet.weight === '0.00' ? '' : pet.weight
              },
              {
                label: 'Energy level',
                name: 'energy_level',
                onChange: this.handleEnergyLevelChange,
                type: 'pet-energy',
                value: pet.energy_level
              },
              {
                label: 'Energy with Dogs',
                name: 'aggression_towards_dogs',
                onChange: this.handleDogAgressionChange,
                type: 'pet-aggresssion',
                value: pet.aggression_towards_dogs
              },
              {
                label: 'Energy with Humans',
                name: 'aggression_towards_humans',
                onChange: this.handleHumansAgressionChange,
                type: 'pet-aggresssion',
                value: pet.aggression_towards_humans
              },
              {
                label: 'Birthday',
                name: 'birthday',
                onChange: this.handleBirthdayChange,
                onValidate: this.handleInputValidate,
                type: 'date-picker',
                showYearDropdown: true,
                value: pet.birthday
              },
              {
                label: 'Collar info',
                name: 'collar_info',
                onChange: this.handleInputChange,
                type: 'textarea',
                value: pet.collar_info
              },
              {
                label: 'Notes',
                name: 'notes',
                onChange: this.handleInputChange,
                type: 'textarea',
                value: pet.notes
              }
            ]} />
            <DataDisplay edit={isEditing} items={[
              {
                label: 'Feeding Instructions',
                name: 'feeding_instructions',
                onChange: this.handleInputChange,
                type: 'textarea',
                value: pet.feeding_instructions
              },
              {
                label: 'Feeding Time',
                name: 'feeding_time',
                onChange: this.handleInputChange,
                value: pet.feeding_time
              },
              {
                label: 'Food Amount',
                name: 'food_amount',
                onChange: this.handleInputChange,
                value: pet.food_amount
              },
              {
                label: 'Treats',
                name: 'toggleTreats',
                onChange: this.handleTreatsChange,
                type: 'toggle-select',
                value: pet.treats ? 1 : (treats || 0)
              },
              {
                label: 'Treats Instructions',
                name: 'treats',
                onChange: this.handleInputChange,
                hide: !(pet.treats ? 1 : (treats || 0)),
                required: treats === 1,
                value: pet.treats
              },
              {
                label: 'Medicine Info',
                name: 'medicine_info',
                onChange: this.handleInputChange,
                type: 'textarea',
                value: pet.medicine_info
              },
              {
                label: 'Rabies Expiration',
                name: 'rabies_expiration',
                onChange: this.handleRabiesExpirationChange,
                onValidate: this.handleInputValidate,
                type: 'date-picker',
                showYearDropdown: true,
                minDate: moment(),
                maxDate: moment().add(2, 'years'),
                value: pet.rabies_expiration
              },
              {
                label: 'Animal Hospital',
                name: 'animal_hospital',
                onChange: this.handleInputChange,
                value: pet.animal_hospital
              },
              {
                label: 'Vet Name',
                name: 'vet_name',
                onChange: this.handleInputChange,
                value: pet.vet_name
              },
              {
                label: 'Vet Phone',
                name: 'vet_phone',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'phone',
                value: pet.vet_phone
              },
              {
                label: 'Vet Address',
                name: 'vet_address',
                onChange: this.handleInputChange,
                value: pet.vet_address,
                type: 'address',
                displayAs: pet.vet_address + ' ' + pet.vet_address2 + ', ' + pet.vet_city + ', ' + pet.vet_state + ' ' + pet.vet_zip
              },
              {
                label: 'Vet Address2',
                name: 'vet_address2',
                onChange: this.handleInputChange,
                value: pet.vet_address2,
                hide: !isEditing
              },
              {
                label: 'Vet City',
                name: 'vet_city',
                onChange: this.handleInputChange,
                value: pet.vet_city,
                hide: !isEditing
              },
              {
                label: 'Vet State',
                name: 'vet_state',
                onChange: this.handleVetStateChange,
                type: 'state',
                value: pet.vet_state,
                hide: !isEditing
              },
              {
                label: 'Vet Zip',
                name: 'vet_zip',
                type: 'zip',
                onChange: this.handleInputChange,
                value: pet.vet_zip,
                hide: !isEditing
              }
            ]} />
            {isEditing ? <SaveCancel
              disabled={errors.length}
              cancelOnClick={this.toggleEdit}
              saveOnClick={this.updateClick}
            /> : null}
          </div>
        </SectionBody>
      </div>
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

CustomerPetsRight.propTypes = {
  customerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  customerPhotoId: PropTypes.number,
  petId: PropTypes.number,
  aggression_towards_dogs: PropTypes.number,
  aggression_towards_humans: PropTypes.number,
  animal_hospital: PropTypes.string,
  birthday: PropTypes.string,
  breed_id: PropTypes.number,
  breed_name: PropTypes.string,
  collar_info: PropTypes.string,
  color: PropTypes.string,
  energy_level: PropTypes.number,
  feeding_instructions: PropTypes.string,
  feeding_time: PropTypes.string,
  food_amount: PropTypes.string,
  gender: PropTypes.string,
  medicine_info: PropTypes.string,
  name: PropTypes.string,
  notes: PropTypes.string,
  photo: PropTypes.string,
  rabies_expiration: PropTypes.string,
  treats: PropTypes.string,
  type: PropTypes.string,
  vet_address: PropTypes.string,
  vet_address2: PropTypes.string,
  vet_city: PropTypes.string,
  vet_name: PropTypes.string,
  vet_phone: PropTypes.string,
  vet_state: PropTypes.string,
  vet_zip: PropTypes.string,
  weight: PropTypes.string,
  isEditing: PropTypes.bool
}

const mapStateToProps = (state, props) => {
  const {
    customerId,
    petId
  } = props
  let customer = state.customers.customers.find(c => `${c.user_id}` === `${customerId}`)
  if (!customer) {
    customer = state.customers.customers.find(c => `${c.walker_id}` === `${customerId}`)
  }
  const pet = state.pets.pets.find(p => `${p.id}` === `${petId}`)

  return {
    customerId,
    customerPhotoId: customer.customer_photo_id,
    ...pet,
    isEditing: state.pets.isPetProfileEditing
  }
}

export default withRouter(connect(mapStateToProps)(CustomerPetsRight))
