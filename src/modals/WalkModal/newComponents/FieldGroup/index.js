// Libraries
import React from 'react'

// Components
import CustomerAddonsSelect from 'GlobalComponents/input/CustomerAddonsSelect'
import AddonsSelect from 'GlobalComponents/input/AddonsSelect'
import CustomersSelect from 'GlobalComponents/input/CustomersSelect'
import DatePicker from 'GlobalComponents/input/DatePicker'
import DaysOfWeekSelect from 'GlobalComponents/input/DaysOfWeekSelect'
import FrequencySelect from 'GlobalComponents/input/FrequencySelect'
import HourMinuteSelect from 'GlobalComponents/input/HourMinuteSelect'
import PetsSelect from 'GlobalComponents/input/PetsSelect'
import CustomerServicesSelect from 'GlobalComponents/input/CustomerServicesSelect'
import ServicesSelect from 'GlobalComponents/input/ServicesSelect'
import WalkersSelect from 'GlobalComponents/input/WalkersSelect'
import TextBox from 'GlobalComponents/input/TextBox'
import PetPeePooSelect from './components/PetPeePooSelect'
import DiscountAndTypeSelect from 'GlobalComponents/input/DiscountAndTypeSelect'
// Style
import './index.css'

const resolveType = item => {
  switch (item.type) {
    case 'addons':
      if (item.customer) {
        return <CustomerAddonsSelect {...item} iconClassname='ion-ios-paw' />
      } else {
        return <AddonsSelect {...item} iconClassname='ion-ios-paw' />
      }
    case 'customers':
      return <CustomersSelect {...item} iconClassname='ion-android-person' />
    case 'date':
      return <DatePicker {...item} iconLeft iconBorder />
    case 'days-of-week':
      return <DaysOfWeekSelect {...item} iconClassname='ion-android-calendar' />
    case 'frequency':
      return <FrequencySelect {...item} iconClassname='ion-loop' />
    case 'hour-minute':
      return <HourMinuteSelect {...item} iconClassname='ion-clock' />
    case 'label':
      return <div className='type-label'><span>{item.value}</span></div>
    case 'pets':
      return <PetsSelect {...item} iconClassname='ion-ios-paw' />
    case 'services':
      if (item.customer) {
        return <CustomerServicesSelect {...item} iconClassname='ion-checkmark' />
      } else {
        return <ServicesSelect {...item} iconClassname='ion-checkmark' />
      }
    case 'walkers':
      return <WalkersSelect {...item} iconClassname='ion-loop' />
    case 'comment':
      return <TextBox {...item} rows={2} />
    case 'petPeePooSelect':
      return <PetPeePooSelect {...item} />
    case 'discount':
      return <DiscountAndTypeSelect {...item} iconClassname='ion-pricetag' />
  }
  return <div>{item.type} not supported.</div>
}

export default props => {
  const { items } = props
  return (
    <div className='FieldGroup'>
      {items.filter(innerItem => !innerItem.skip).map((item, key) => <div className={`item${item.mark ? ' mark' : ''}`} key={key}>
        <div className='label'>{item.label}</div>
        <div className='input'>{resolveType(item)}</div>
      </div>)}
    </div>
  )
}
