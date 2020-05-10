// Libraries
import React from 'react'
import { View, Text } from 'react-native'
// Utils
import { utility } from '../../../utils'

// Components
import TextInput from '../input/TextInput'

// import * as _const from '../input/WalkerAccessLevelSelect/constants'
// Styles
import Styles from './styles'

const renderDisplayValue = item => {
  if (item.displayAs) {
    return <Text style={Styles.value}>{item.displayAs}</Text>
  }
  if (item.type === 'image') {
    // if (item.value) {
    //   return <Image className='image' onErrorComponent={<Text style={Styles.value}>Image Error</Text>} src={item.value} />
    // }
    return <Text style={Styles.value}>No image.</Text>
  }
  if (item.type === 'ein') {
    return <Text style={Styles.value}>{utility.toEIN(item.value)}</Text>
  }
  if (item.type === 'phone') {
    return <Text style={Styles.value}>{utility.toPhone(item.value)}</Text>
  }
  if (item.type === 'pet-energy') {
    switch (parseInt(item.value)) {
      case 0:
        return <Text style={Styles.value}>Low</Text>
      case 1:
        return <Text style={Styles.value}>Medium</Text>
      case 2:
        return <Text style={Styles.value}>High</Text>
      case 3:
        return <Text style={Styles.value}>Very High</Text>
      default:
        return <Text style={Styles.value}>Very High</Text>
    }
  }
  if (item.type === 'pet-aggresssion') {
    switch (parseInt(item.value)) {
      case 0:
        return <Text style={Styles.value}>None</Text>
      case 1:
        return <Text style={Styles.value}>Mild</Text>
      case 2:
        return <Text style={Styles.value}>Moderate</Text>
      case 3:
        return <Text style={Styles.value}>Severe</Text>
      default:
        return <Text style={Styles.value}>Severe</Text>
    }
  }
  if (item.type === 'toggle-select') {
    return <Text style={Styles.value}>{Number(item.value) === 1 ? 'YES' : 'NO'}</Text>
  }
  if (item.type === 'date-picker') {
    return <Text style={Styles.value}>{utility.dateFormat(item.value, 'MM/DD/YYYY')}</Text>
  }
  // if (item.type === 'walker-access-level-select') {
  //   return <Text style={Styles.value}>{_const.WALKER_ACCESS_LEVELS.find(a => a.value == (item.value == 'basic' ? '' : item.value)).label}</Text>
  // }
  return <Text style={Styles.value}>{item.value}</Text>
}

const renderEditValue = item => {
  if (item.type === 'image') {
    return <View>TODO: Upload image</View>
  }
  return <TextInput number={item.type === 'number'} password={item.type === 'password'} name={item.name} onChange={item.onChange} placeholder={item.placeholder} onValidate={item.onValidate} type2 value={item.value} required={item.required} error={item.error} />
}

const renderValue = (mode, item) => {
  // if (item.loading) {
  //   return <ContentLoader />
  // }

  if (item.noEdit && mode === 'edit') return <View style={{ margin: '8px 5px', minHeight: '16px' }}>{renderDisplayValue(item)}</View>

  switch (mode) {
    case 'edit':
      return renderEditValue(item)
    default:
      return renderDisplayValue(item)
  }
}

const renderRow = (mode, item, index) => {
  if (item.type === 'break') {
    return <View style={Styles.DataDisplay_row} key={index}><View className='break' /></View>
  }
  if (item.type === 'message') {
    return <View style={Styles.DataDisplay_row} key={index}><p className='message' style={{ width: item.valueWidth, minWidth: item.valueMinWidth }}>{item.value}</p></View>
  }
  return <View style={Styles.DataDisplay_row} key={index}>
    <View style={Styles.DataDisplay_column_label}>
      <Text style={Styles[`DataDisplay_column_label_${item.type === 'heading' ? ' headingText' : 'text'}`]}>{item.label}</Text>
    </View>
    <View style={Styles['DataDisplay_column_value_' + mode]} >
      {item.type === 'heading' ? <View className='value'>{item.leftComponent}</View> : renderValue(mode, item)}
    </View>
  </View>
}

export default class DataDisplay extends React.Component {
  render () {
    const mode = this.props.edit ? 'edit' : 'default'
    const items = this.props.items || []

    return <View style={Styles['DataDisplay_' + mode]}>
      {items.map((item, index) => item.hide ? null : renderRow(mode, item, index))}
    </View>
  }
}
