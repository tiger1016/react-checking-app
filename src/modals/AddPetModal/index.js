// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

// Globals
import { Tab } from 'GlobalComponents/TabComponent/Tab'
import ModalTemplate from 'GlobalComponents/ModalTemplate'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import PhoneInput from 'GlobalComponents/input/PhoneInput'
import DatePickerInput from 'GlobalComponents/input/DatePicker'
import GenderSelect from 'GlobalComponents/input/GenderSelect'
import StateSelect from 'GlobalComponents/input/StateSelect'
import ZipInput from 'GlobalComponents/input/ZipInput'
import PetEnergySelect from 'GlobalComponents/input/PetEnergySelect'
import PetAggressionSelect from 'GlobalComponents/input/PetAggressionSelect'
import PetBreedSelect from 'GlobalComponents/input/PetBreedSelect'
import TextInput from 'GlobalComponents/input/TextInput'
import ToggleSelect from 'GlobalComponents/input/ToggleSelect'
import TextBox from 'GlobalComponents/input/TextBox'
import ImageUploader from 'GlobalComponents/ImageUploader'

// Styles
import './index.css'

// Actions
import petsActions from 'Actions/pets'

// Controllers
import { appController, petsController } from 'Controllers'

let addPetValidation = {
  name: ['required'],
  type: ['required']
  // photo: ['required']
}

class AddNewPets extends Component {
  componentWillMount () {
    this.setState({ newPet: new (petsController.petStructGenerator())(), treats: '' })
  }
  handleInputChange = (type, e, key) => {
    let tempInfo = { ...this.state.newPet }
    switch (type) {
      case 'input':
        tempInfo[key] = e.target.value
        break
      case 'datepicker':
        tempInfo[key] = e.format('YYYY-MM-DD')
        break
      case 'select':
        tempInfo[key] = e.value
        break
      case 'file':
        if (e && e.length > 0) { tempInfo[key] = e[0] } else {
          delete tempInfo[key]
        }
        break
    }
    this.setState({ newPet: tempInfo })
  }

  isFieldValid = (field) => {
    if (addPetValidation[field] && this.state.touched) {
      let isValid = true
      let self = this
      addPetValidation[field].map(function (item) {
        switch (item) {
          case 'required':
            if (self.state.newPet[field] && self.state.newPet[field] != null && self.state.newPet[field] !== undefined && self.state.newPet[field] !== '') {
              isValid = true
            } else { isValid = false }
            break
          case 'email':
            if (self.state.newPet[field] && self.state.newPet[field] != null && self.state.newPet[field] !== undefined && self.state.newPet[field] !== '') {
              var re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              isValid = re.test(self.state.newPet[field])
            }
            break
          case 'phone':
            let phone = self.state.newPet[field].replace('_', '')
            if (phone.length === 14) {
              isValid = true
            } else { isValid = false }
            break
          case 'zip':
            let zip = self.state.newPet[field].replace('_', '')
            if (zip.length === 5) {
              isValid = true
            } else { isValid = false }
            break
          case 'password2':
            if (self.state['password2'] === self.state['password']) {
              isValid = true
            } else { isValid = false }
            break
          case '0to10':
            if (!self.state.newPet[field] && self.state.newPet[field] !== '' && self.state.newPet[field] != null) {
              isValid = true
            } else if (self.state.newPet[field] > 10 || self.state.newPet[field] < 0) {
              isValid = false
            } else {
              isValid = true
            }
            break
          default:
        }
      })
      if (isValid) {
        return ''
      } else {
        return 'errBorder'
      }
    } else {
      return ''
    }
  }
  isModalValid = () => {
    var isValid = true
    let self = this
    this.state.touched = true
    for (var field in addPetValidation) {
      if (self.isFieldValid(field) === 'errBorder') {
        isValid = false
      }
    }
    this.forceUpdate()
    return isValid
  }

  savePet = () => {
    this.state.touched = true
    if (this.isModalValid()) {
      this.props.petsActions.createPets(this.props.app.modal.data.custid, this.state.newPet, () => appController.closeModal())
    }
  }
  handleFileDelete = (e) => {
    this.handleInputChange('file', undefined, 'photo')
    this.setState({ _photo: undefined })
  }
  renderPetInfo () {
    return (
      <div className='container-1'>
        <div className='petPictureContainer'>
          <div className='left'>
            <div className='pets-pic-div'>
              <ImageUploader uploadBtn sizeInfo='max 1mb, 640 x 480' multiple={false} onChange={(files) => this.handleInputChange('file', files, 'photo')} />
              {/* <div style={{paddingLeft: '0px', width: '20px', float: 'right', cursor: 'pointer'}}>
                <img src={trash} onClick={(e) => this.handleFileDelete(e)} />
              </div>
              <img className={'custom-file-upload-img ' + this.isFieldValid('photo')} src={this.state._photo ? this.state._photo : cam} alt='No image' />
              <input className='uploadBtn' id='file-upload' type='file' accept='image/x-png,image/gif,image/jpeg' onChange={(e) => this.handleFileChange(e)} />
              <label htmlFor='file-upload' className='custom-file-upload'>Upload New</label>
              <br /><span className='file-size-info'>max 1mb, 640 x 480</span> */}
            </div>

          </div>
          <div className='right'>
            <ModalTemplateField
              label='Name*'
              input={<TextInput error={this.isFieldValid('name')} id='customer_pet_name' style={{ width: '23%' }} type='text' value={this.state.newPet.name} onChange={(e) => this.handleInputChange('input', e, 'name')} />}
            />
            <ModalTemplateField
              label='Type*'
              input={<TextInput error={this.isFieldValid('type')} id='customer_pet_bread' style={{ width: '23%' }} type='text' value={this.state.newPet.type} onChange={(e) => this.handleInputChange('input', e, 'type')} />}
            />
            <ModalTemplateField
              label='Breed'
              input={<PetBreedSelect value={this.state.newPet.breed_id} onChange={(e) => this.handleInputChange('select', e, 'breed_id')} />}
            />
            <ModalTemplateField
              label='Color'
              input={<TextInput id='customer_pet_color' style={{ width: '23%' }} type='text' value={this.state.newPet.color} onChange={(e) => this.handleInputChange('input', e, 'color')} />}
            />
            <ModalTemplateField
              label='Weight'
              input={<TextInput number nodecimal id='customer_pet_weight' style={{ width: '23%' }} type='string' value={this.state.newPet.weight} onChange={(e) => this.handleInputChange('input', e, 'weight')} />}
            />
            <ModalTemplateField
              label='Gender'
              input={<GenderSelect value={this.state.newPet.gender} onChange={(e) => this.handleInputChange('select', e, 'gender')} />}
            />
            <ModalTemplateField
              label='Energy Level'
              input={<PetEnergySelect value={this.state.newPet.energy_level} onChange={(e) => this.handleInputChange('select', e, 'energy_level')} />}
            />
            <ModalTemplateField
              label='Energy with Dogs'
              input={<PetAggressionSelect value={this.state.newPet.aggression_towards_dogs} onChange={(e) => this.handleInputChange('select', e, 'aggression_towards_dogs')} />}
            />
            <ModalTemplateField
              label='Energy with Humans'
              input={<PetAggressionSelect value={this.state.newPet.aggression_towards_humans} onChange={(e) => this.handleInputChange('select', e, 'aggression_towards_humans')} />}
            />
          </div>
        </div>
        <ModalTemplateField
          label='Birthdate'
          input={<DatePickerInput width='200px' id='customer_pet_date' value={this.state.newPet.birthday} showYearDropdown onChange={(e) => this.handleInputChange('datepicker', e, 'birthday')} />}
        />
        <ModalTemplateField
          label='Collar/Leash Info:'
          input={<TextBox id='customer_pet_collar_leash_info' value={this.state.newPet.collar_info} onChange={(e) => this.handleInputChange('input', e, 'collar_info')} />}
        />
        <ModalTemplateField
          label='Feeding Instructions:'
          input={<TextBox id='customer_pet_feeding_info' value={this.state.newPet.feeding_instructions} onChange={(e) => this.handleInputChange('input', e, 'feeding_instructions')} />}
        />
        <ModalTemplateField
          label='Feeding Brand:'
          input={<TextInput name='customer_pet_food_brand' id='customer_pet_food_brand' value={this.state.newPet.food_brand} onChange={(e) => this.handleInputChange('input', e, 'food_brand')} />}
        />
        <ModalTemplateField
          label='Feeding Amount:'
          input={<TextInput name='customer_pet_food_amount' id='customer_pet_food_amount' value={this.state.newPet.food_amount} onChange={(e) => this.handleInputChange('input', e, 'food_amount')} />}
        />
        <ModalTemplateField
          label='Feeding Time:'
          input={<TextInput id='customer_pet_feeding_time' value={this.state.newPet.feeding_time} onChange={(e) => this.handleInputChange('input', e, 'feeding_time')} />}
        />
        <ModalTemplateField
          label='Treats:'
          input={<ToggleSelect id='customer_pet_toggleTreat' value={this.state.treats} onChange={(e) => this.setState({ treats: e.value })} />}
        />
        {this.state.treats === 1 && <ModalTemplateField
          label='Treats Instructions:'
          input={<TextInput id='customer_pet_treats' value={this.state.newPet.treats} onChange={(e) => this.handleInputChange('input', e, 'treats')} />}
        />}
        <ModalTemplateField
          label='Pet Notes:'
          input={<TextBox id='customer_pet_notes' value={this.state.newPet.notes} onChange={(e) => this.handleInputChange('input', e, 'notes')} />}
        />
      </div>
    )
  }
  renderPetMedInfo () {
    let minDate = moment()
    let maxDate = moment().add(2, 'years')
    return (
      <div className='container-1'>
        <ModalTemplateField
          label='Rabies Vaccination Date:'
          input={<DatePickerInput minDate={minDate} maxDate={maxDate} width='200px' id='customer_vet_date' showYearDropdown value={this.state.newPet.rabies_expiration} onChange={(e) => this.handleInputChange('datepicker', e, 'rabies_expiration')} />}
        />
        <ModalTemplateField
          label='Vet Name:'
          input={<TextInput id='customer_vet_name' type='text' value={this.state.newPet.vet_name} onChange={(e) => this.handleInputChange('input', e, 'vet_name')} />}
        />
        <ModalTemplateField
          label='Vet Phone:'
          input={<PhoneInput id='customer_vet_phone' type='text' value={this.state.newPet.vet_phone} onChange={(e) => this.handleInputChange('input', e, 'vet_phone')} />}
        />
        <ModalTemplateField
          label='Vet Address:'
          input={<TextInput name='customer_vet_street_addres_1' id='customer_vet_street_addres_1' type='text' value={this.state.newPet.vet_address} onChange={(e) => this.handleInputChange('input', e, 'vet_address')} />}
        />
        <ModalTemplateField
          label=' Vet Address2:'
          input={<TextInput name='customer_vet_street_addres_2' id='customer_vet_street_addres_2' type='text' value={this.state.newPet.vet_address2} onChange={(e) => this.handleInputChange('input', e, 'vet_address2')} />}
        />
        <ModalTemplateField
          label='Vet City:'
          input={<TextInput name='customer_vet_city' id='customer_vet_city' value={this.state.newPet.vet_city} onChange={(e) => this.handleInputChange('input', e, 'vet_city')} />}
        />
        <ModalTemplateField
          label='State and Zip:'
          input={<div className='dualInput'>
            <StateSelect value={this.state.newPet.vet_state} onChange={(e) => this.handleInputChange('select', e, 'vet_state')} />
            <span className='pad10' />
            <ZipInput id='customer_vet_zip' style={{ width: '23%', marginLeft: '10px' }} type='number' value={this.state.newPet.vet_zip} onChange={(e) => this.handleInputChange('input', e, 'vet_zip')} />
          </div>}
        />
        <ModalTemplateField
          label='Animal Hospital Name:'
          input={<TextInput id='customer_vet_hospital_naem' type='text' value={this.state.newPet.animal_hospital} onChange={(e) => this.handleInputChange('input', e, 'animal_hospital')} />}
        />
        <ModalTemplateField
          label='Medication Info:'
          input={<TextBox id='customer_vet_med_info' value={this.state.newPet.medicine_info} onChange={(e) => this.handleInputChange('input', e, 'medicine_info')} />}
        />
      </div>
    )
  }
  onTabChange = (index) => {
    this.setState({ currentTab: index })
  }
  actionButton = () => {
    if (this.Tab) {
      switch (this.state.currentTab) {
        case 1:
          return [{
            hide: this.props.petsLoading,
            onClick: this.Tab.previousTab,
            text: 'Previous',
            textOnly: true
          }, {
            loading: this.props.petsLoading,
            onClick: this.savePet,
            text: 'Add Pet'
          }]
        default:
          return [{
            onClick: () => appController.closeModal(),
            text: 'Cancel',
            textOnly: true
          }, {
            onClick: this.Tab.nextTab,
            text: 'Next'
          }]
      }
    } else {
      return null
    }
  }
  render () {
    const tabs = [
      { title: 'Pet Info', content: this.renderPetInfo(), checkValidation: this.isModalValid },
      { title: 'Medical Info', content: this.renderPetMedInfo(), checkValidation: () => { return true } }
    ].map(tab => {
      return Object.assign({}, tab)
    })
    return (
      <ModalTemplate
        actions={this.actionButton()}
        body={() => <div id='AddNewPet' >
          <Tab onTabChange={this.onTabChange} checkValidation isProgress onRef={instance => { this.Tab = instance }} tabs={tabs} />
        </div>
        }
        title='Add New Pet'
      />
    )
  }
}
function mapStateToProps (state, ownProps) {
  return {
    petsLoading: state.pets.loading,
    app: state.app
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    petsActions: bindActionCreators(petsActions, dispatch),
    dispatch
  })
)(AddNewPets)
