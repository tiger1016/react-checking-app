// Libraries
import React, { Component } from 'react'
import { Text, View } from 'react-native'
// Components
import DatePickerRange from '../../globalComponents/input/DatePickerRange'
// import SearchInput from 'GlobalComponents/searchInput'
// import WalkersSelect from 'GlobalComponents/input/WalkersSelect'
import Styles from './styles'
export default class Filterbar extends Component {
  render () {
    return (
      <View style={Styles.filterContainer}>
        <View style={Styles.labelView}>
          <Text style={Styles.labelText}>Filter by date:</Text>
        </View>
        <View style={Styles.filterBody}>
          <DatePickerRange {...this.props} />
        </View>
      </View>
    )
  }
}
