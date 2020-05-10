// Libraries
import React, { Component } from 'react'

// Components
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
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import ImageUploader from 'GlobalComponents/ImageUploader'

export default class AddPetInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return <div className='sub-align'>
      {this.props.addPet.map((data, i) => <div key={i}>
        <div className='container'>
          {i === 0 ? <div className='add-customer-title'>Pet Information</div> : <div className='add-customer-title'>Pet {i + 1} Information</div>}
          <div className='petPictureContainer'>
            <div className='left'>
              <div className='pets-pic-div'>
                <ImageUploader uploadBtn sizeInfo='max 1mb, 640 x 480' multiple={false} onChange={(files) => this.props.setParentState('file', files, 'photo', i)} />
                {/* <div style={{paddingLeft: '0px', width: '20px', float: 'right', cursor: 'pointer'}}>
                  <img src={trash} onClick={(e) => this.handleDelete(e, i)} />
                </div>
                <img className={'custom-file-upload-img ' + this.props.isPetFieldValid('addPet', 'photo', i)} src={this.state.photo[i] ? this.state.photo[i] : cam}alt='No image' />
                <input className='uploadBtn' id={'file-upload' + i} type='file' accept='image/x-png,image/gif,image/jpeg' onChange={(e) => this.handleChange(e, i)} />
                <label htmlFor={'file-upload' + i} className='custom-file-upload'>Upload New</label>
                <br /><span className='file-size-info'>max 1mb, 640 x 480</span> */}
              </div>
            </div>
            <div className='right'>
              <ModalTemplateField
                label='Name*'
                input={<TextInput name='customer_pet_name' id='customer_pet_name' error={this.props.isPetFieldValid('addPet', 'name', i)} value={this.props.addPet[i].name} onChange={(e) => this.props.setParentState('input', e, 'name', i)} />} />
              <ModalTemplateField
                label='Type*'
                input={<TextInput name='customer_pet_type' id='customer_pet_type' error={this.props.isPetFieldValid('addPet', 'type', i)} value={this.props.addPet[i].type} onChange={(e) => this.props.setParentState('input', e, 'type', i)} />} />
              <ModalTemplateField
                label='Breed'
                input={<PetBreedSelect name='customer_pet_bread' id='customer_pet_bread' clearable={false} value={this.props.addPet[i].breed_id} onChange={(e) => this.props.setParentState('select', e, 'breed_id', i)} />} />
              <ModalTemplateField
                label='Color'
                input={<TextInput name='customer_pet_color' id='customer_pet_color' value={this.props.addPet[i].color} onChange={(e) => this.props.setParentState('input', e, 'color', i)} />} />
              <ModalTemplateField
                label='Weight'
                input={<TextInput name='customer_pet_weight' id='customer_pet_weight' number nodecimal value={this.props.addPet[i].weight} onChange={(e) => this.props.setParentState('input', e, 'weight', i)} />} />
              <ModalTemplateField
                label='Birthdate'
                input={<DatePickerInput showYearDropdown name='customer_pet_date' id='customer_pet_date' value={this.props.addPet[i].birthday} onChange={(e) => this.props.setParentState('date', e, 'birthday', i)} />} />
              <ModalTemplateField
                label='Gender'
                input={<GenderSelect name='customer_pet_gender' clearable={false} value={this.props.addPet[i].gender} onChange={(e) => this.props.setParentState('select', e, 'gender', i)} />} />
              <ModalTemplateField
                label='Energy Level'
                input={<PetEnergySelect name='customer_pet_energy_level' clearable={false} value={this.props.addPet[i].energy_level} onChange={(e) => this.props.setParentState('select', e, 'energy_level', i)} />} />
              <ModalTemplateField
                label='Energy with Dogs'
                input={<PetAggressionSelect name='customer_pet_aggression_towards_dogs' clearable={false} value={this.props.addPet[i].aggression_towards_dogs} onChange={(e) => this.props.setParentState('select', e, 'aggression_towards_dogs', i)} />} />
              <ModalTemplateField
                label='Energy with Humans'
                input={<PetAggressionSelect name='customer_pet_aggression_towards_humans' clearable={false} value={this.props.addPet[i].aggression_towards_humans} onChange={(e) => this.props.setParentState('select', e, 'aggression_towards_humans', i)} />} />
            </div>
          </div>
          <ModalTemplateField
            label='Collar/Leash Info:'
            input={<TextInput name='customer_pet_collar_leash_info' id='customer_pet_collar_leash_info' value={this.props.addPet[i].collar_info} onChange={(e) => this.props.setParentState('input', e, 'collar_info', i)} />}
          />
          <ModalTemplateField
            label='Feeding Instructions:'
            input={<TextBox name='customer_pet_feeding_info' id='customer_pet_feeding_info' value={this.props.addPet[i].feeding_instructions} onChange={(e) => this.props.setParentState('input', e, 'feeding_instructions', i)} />}
          />
          <ModalTemplateField
            label='Feeding Brand:'
            input={<TextInput name='customer_pet_feeding_brand' id='customer_pet_feeding_brand' value={this.props.addPet[i].food_brand} onChange={(e) => this.props.setParentState('input', e, 'food_brand', i)} />}
          />
          <ModalTemplateField
            label='Feeding Amount:'
            input={<TextInput name='customer_pet_feeding_amount' id='customer_pet_feeding_amount' value={this.props.addPet[i].food_amount} onChange={(e) => this.props.setParentState('input', e, 'food_amount', i)} />}
          />
          <ModalTemplateField
            label='Feeding Time:'
            input={<TextInput name='customer_pet_feeding_time' id='customer_pet_feeding_time' value={this.props.addPet[i].feeding_time} onChange={(e) => this.props.setParentState('input', e, 'feeding_time', i)} />}
          />
          <ModalTemplateField
            label='Treats:'
            input={<ToggleSelect name='customer_pet_toggleTreat' id='customer_pet_toggleTreat' value={this.state.treats} onChange={(e) => this.setState({ treats: e.value })} />}
          />
          {this.state.treats === 1 && <ModalTemplateField
            label='Treats Instructions:'
            input={<TextInput name='customer_pet_feeding_treats' id='customer_pet_feeding_treats' value={this.props.addPet[i].treats} onChange={(e) => this.props.setParentState('input', e, 'treats', i)} />}
          />}
          <ModalTemplateField
            label='Pet Notes:'
            input={<TextBox name='customer_pet_notes' id='customer_pet_notes' value={this.props.addPet[i].notes} onChange={(e) => this.props.setParentState('input', e, 'notes', i)} />}
          />
        </div>
        <div className='container two'>

          {i === 0 ? <div className='add-customer-title' >Medical Information </div> : <div className='add-customer-title' >Pet {i + 1} Medical Information </div>}
          <ModalTemplateField
            label='Rabies Vaccination Date:'
            input={<DatePickerInput name='customer_vet_date' id='customer_vet_date' width='200px' value={this.props.addPet[i].rabies_expiration} onChange={(e) => this.props.setParentState('date', e, 'rabies_expiration', i)} />}
          />
          <ModalTemplateField
            label='Vet Name:'
            input={<TextInput name='customer_vet_name' id='customer_vet_name' value={this.props.addPet[i].vet_name} onChange={(e) => this.props.setParentState('input', e, 'vet_name', i)} />}
          />
          <ModalTemplateField
            label='Vet Phone:'
            input={<PhoneInput name='customer_vet_phone' id='customer_vet_phone' mask='(111) 111-1111' value={this.props.addPet[i].vet_phone} onChange={(e) => this.props.setParentState('input', e, 'vet_phone', i)} />}
          />
          <ModalTemplateField
            label='Vet Address:'
            input={<TextInput name='customer_vet_street_addres_1' id='customer_vet_street_addres_1' value={this.props.addPet[i].vet_address} onChange={(e) => this.props.setParentState('input', e, 'vet_address', i)} />}
          />
          <ModalTemplateField
            label='Vet Address2:'
            input={<TextInput name='customer_vet_street_addres_2' id='customer_vet_street_addres_2' value={this.props.addPet[i].vet_address2} onChange={(e) => this.props.setParentState('input', e, 'vet_address2', i)} />}
          />
          <ModalTemplateField
            label='Vet City:'
            input={<TextInput name='customer_vet_city' id='customer_vet_city' value={this.props.addPet[i].vet_city} onChange={(e) => this.props.setParentState('input', e, 'vet_city', i)} />}
          />
          <ModalTemplateField
            label='State and Zip:'
            input={<div className='dualInput'>
              <StateSelect name='customer_vet_state' id='customer_vet_state' clearable={false} value={this.props.addPet[i].vet_state} onChange={(e) => this.props.setParentState('select', e, 'vet_state', i)} />
              <span className='pad10' />
              <ZipInput name='customer_vet_zip' id='customer_vet_zip' value={this.props.addPet[i].vet_zip} onChange={(e) => this.props.setParentState('input', e, 'vet_zip', i)} />
            </div>}
          />
          <ModalTemplateField
            label='Animal Hospital Name:'
            input={<TextInput name='customer_vet_hospital_naem' id='customer_vet_hospital_naem' value={this.props.addPet[i].animal_hospital} onChange={(e) => this.props.setParentState('input', e, 'animal_hospital', i)} />}
          />
          <ModalTemplateField
            label='Medication Info:'
            input={<TextBox name='customer_vet_med_info' id='customer_vet_med_info' value={this.props.addPet[i].medicine_info} onChange={(e) => this.props.setParentState('input', e, 'medicine_info', i)} />}
          />
        </div>
      </div>)}
    </div>
  }
}
