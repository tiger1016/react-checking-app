// Libraries
import React from 'react'

// Utils
import { utility } from 'Utils/utility'

// Components
import BillingFrequencySelect from '../input/BillingFrequencySelect'
import BillingTimingSelect from '../input/BillingTimingSelect'
import CCVInput from '../input/CCVInput'
import ContentLoader from '../ContentLoader'
import CreditCardInput from '../input/CreditCardInput'
import DateInput from '../input/DateInput'
import DatePickerInput from '../input/DatePicker'
import DayMonthYear from '../input/DayMonthYear'
import DaysOfMonthSelect from '../input/DaysOfMonthSelect'
import EINInput from '../input/EINInput'
import EmailInput from '../input/EmailInput'
import EncryptedText from '../input/EncryptedText'
import GenderSelect from '../input/GenderSelect'
import Image from '../Image'
import InvoiceTermsSelect from '../input/InvoiceTermsSelect'
import MonthsSelect from '../input/MonthsSelect'
import NumberSelect from '../input/NumberSelect'
import PaymentTypeSelect from '../input/PaymentTypeSelect'
import PetAggressionSelect from '../input/PetAggressionSelect'
import PetBreedSelect from '../input/PetBreedSelect'
import PetEnergySelect from '../input/PetEnergySelect'
import PercentInput from '../input/PercentInput'
import PhoneInput from '../input/PhoneInput'
import QrcodesSelect from '../input/QrcodesSelect'
import ServicesSelect from '../input/ServicesSelect'
import SSNInput from '../input/SSNInput'
import AccountInput from '../input/AccountInput'
import RoutingInput from '../input/RoutingInput'
import StateSelect from '../input/StateSelect'
import TextBox from '../input/TextBox'
import TextInput from '../input/TextInput'
import TimeZoneSelect from '../input/TimeZoneSelect'
import ToggleSelect from '../input/ToggleSelect'
import WeightInput from '../input/WeightInput'
import WalkerAccessLevelSelect from '../input/WalkerAccessLevelSelect'
import WalkersSelect from '../input/WalkersSelect'
import YearInput from '../input/YearInput'
import YearSelect from '../input/YearSelect'
import ZipInput from '../input/ZipInput'

// Component
import Help from '../Help'
import * as _const from '../input/WalkerAccessLevelSelect/constants'

// Styles
import './index.css'

const renderDisplayValue = item => {
  if (item.type === 'image') {
    if (item.value) {
      return <Image className='image' onErrorComponent={<span className='value'>Image Error</span>} src={item.value} />
    }
    return <span className='value'>No image.</span>
  }
  if (item.type === 'ein') {
    return <span className='value'>{utility.toEIN(item.value)}</span>
  }
  if (item.type === 'phone') {
    return <span className='value'>{utility.toPhone(item.value)}</span>
  }
  if (item.type === 'pet-energy') {
    switch (parseInt(item.value)) {
      case 1:
        return <span className='value'>Low</span>
      case 2:
        return <span className='value'>Medium</span>
      case 3:
        return <span className='value'>High</span>
      case 4:
        return <span className='value'>Very High</span>
      default:
        return <span className='value' />
    }
  }
  if (item.type === 'pet-aggresssion') {
    switch (parseInt(item.value)) {
      case 1:
        return <span className='value'>Low</span>
      case 2:
        return <span className='value'>Medium</span>
      case 3:
        return <span className='value'>High</span>
      case 4:
        return <span className='value'>Very High</span>
      default:
        return <span className='value' />
    }
  }
  if (item.type === 'toggle-select') {
    switch (parseInt(item.value)) {
      case 0:
        return <span className='value'>NO</span>
      case 1:
        return <span className='value'>YES</span>
      default:
        return <span className='value' />
    }
  }
  if (item.type === 'date-picker') {
    return <span className='value'>{utility.dateFormat(item.value, 'MM/DD/YYYY')}</span>
  }
  if (item.type === 'password') {
    return <EncryptedText count={item.value.length || 8} />
  }
  if (item.type === 'walker-access-level-select') {
    const v = _const.WALKER_ACCESS_LEVELS.find(a => a.value === (item.value === 'basic' ? 'none' : item.value))
    return <span className='value'>{v && v.label}</span>
  }
  if (item.type === 'qrcode-select') {
    return <span className='value'>{item.value.toString().padStart(5, '0')}</span>
  }
  if (item.type === 'cc') {
    if (item.cardType) {
      const cardType = utility.getCreditCardNameByTitle(item.cardType)
      if (cardType) {
        const img = require(`Assets/cards/${cardType}.png`)
        return <span className='value flex'><img className='card-icon' src={img} />&nbsp;&nbsp;{item.value}</span>
      }
    } else {
      return <span className='value flex'>{item.value}</span>
    }
  }
  if (item.displayAs) {
    return <span className='value'>{item.displayAs}</span>
  }
  return <span className='value'>{item.value}</span>
}

const renderEditValue = item => {
  if (item.type === 'toggle-select') {
    return <ToggleSelect {...item} />
  }
  if (item.type === 'billing-frequency') {
    return <BillingFrequencySelect {...item} />
  }
  if (item.type === 'walker-access-level-select') {
    return <WalkerAccessLevelSelect {...item} />
  }
  if (item.type === 'billing-timing') {
    return <BillingTimingSelect {...item} />
  }
  if (item.type === 'cc') {
    return <CreditCardInput {...item} type2 />
  }
  if (item.type === 'ccv') {
    return <CCVInput {...item} type2 />
  }
  if (item.type === 'date') {
    return <DayMonthYear {...item} />
  }
  if (item.type === 'day-of-month') {
    return <DaysOfMonthSelect {...item} />
  }
  if (item.type === 'date-mask') {
    return <DateInput {...item} />
  }
  if (item.type === 'date-picker') {
    return <DatePickerInput {...item} />
  }
  if (item.type === 'ein') {
    return <EINInput {...item} type2 />
  }
  if (item.type === 'email') {
    return <EmailInput {...item} type2 />
  }
  if (item.type === 'gender') {
    return <GenderSelect {...item} />
  }
  if (item.type === 'image') {
    return <div>TODO: Upload image</div>
  }
  if (item.type === 'invoice-terms') {
    return <InvoiceTermsSelect {...item} />
  }
  if (item.type === 'months-select') {
    return <MonthsSelect {...item} />
  }
  if (item.type === 'number-select') {
    return <NumberSelect {...item} type2 />
  }
  if (item.type === 'payment-type') {
    return <PaymentTypeSelect {...item} />
  }
  if (item.type === 'percent') {
    return <PercentInput {...item} type2 />
  }
  if (item.type === 'phone') {
    return <PhoneInput {...item} type2 />
  }
  if (item.type === 'ssn') {
    return <SSNInput {...item} type2 />
  }
  if (item.type === 'account') {
    return <AccountInput {...item} type2 />
  }
  if (item.type === 'routing') {
    return <RoutingInput {...item} type2 />
  }
  if (item.type === 'state') {
    return <StateSelect {...item} />
  }
  if (item.type === 'textarea') {
    return <TextBox {...item} />
  }
  if (item.type === 'weight') {
    return <WeightInput {...item} />
  }
  if (item.type === 'year') {
    return <YearInput {...item} />
  }
  if (item.type === 'year-select') {
    return <YearSelect {...item} />
  }
  if (item.type === 'zip') {
    return <ZipInput {...item} type2 />
  }
  if (item.type === 'pet-energy') {
    return <PetEnergySelect {...item} />
  }
  if (item.type === 'pet-aggresssion') {
    return <PetAggressionSelect {...item} />
  }
  if (item.type === 'walker-select') {
    return <WalkersSelect onlyActive {...item} />
  }
  if (item.type === 'service-select') {
    return <ServicesSelect {...item} />
  }
  if (item.type === 'petBreed-select') {
    return <PetBreedSelect {...item} />
  }
  if (item.type === 'qrcode-select') {
    return <QrcodesSelect {...item} />
  }
  if (item.type === 'timezone') {
    return <TimeZoneSelect {...item} />
  }

  return <TextInput number={item.type === 'number'} name={item.name} onChange={item.onChange} placeholder={item.placeholder} onValidate={item.onValidate} type2 value={item.value} required={item.required} error={item.error} />
}

const renderValue = (mode, item) => {
  if (item.loading) {
    return <ContentLoader />
  }

  if (item.noEdit && mode === 'edit') return <div style={{ margin: '8px 5px', minHeight: '16px' }}>{renderDisplayValue(item)}</div>

  switch (mode) {
    case 'edit':
      return renderEditValue(item)
    default:
      return renderDisplayValue(item)
  }
}

const renderRow = (mode, item, index) => {
  if (item.type === 'break') {
    return <div className='DataDisplay-row' key={index}><div className='break' /></div>
  }
  if (item.type === 'message') {
    return <div className='DataDisplay-row' key={index}><p className='message' style={{ width: item.valueWidth, minWidth: item.valueMinWidth }}>{item.value}</p></div>
  }
  return <div className='DataDisplay-row' key={index}>
    <div className='DataDisplay-column label-column'>
      <span className={`label${item.type === 'heading' ? ' heading' : ''}`}>{item.label}
        {item.help ? <div className='help-section'>
          <Help text={item.help.text} />
        </div> : null}</span>
    </div>
    <div className='DataDisplay-column value-column' style={{ maxWidth: item.valueWidth, minWidth: item.valueMinWidth }}>
      {item.type === 'heading' ? <div className='value'>{item.leftComponent}</div> : renderValue(mode, item)}
    </div>
  </div>
}

export default class DataDisplay extends React.Component {
  render () {
    const mode = this.props.edit ? 'edit' : 'default'
    const items = this.props.items || []
    return <div className={`DataDisplay ${mode}`}>
      {items.map((item, index) => item.hide ? null : renderRow(mode, item, index))}
    </div>
  }
}
