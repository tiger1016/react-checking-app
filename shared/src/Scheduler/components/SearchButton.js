// Libraries
import React from 'react'
import { TextInput, View } from 'react-native'

// Utils
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

export default props => <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder='Search staff/client or a pet name'
    value={props.searchValue}
    onChangeText={value => props.search(value)}
  />
</View>

const styles = {
  input: {
    borderWidth: format_number(1, 'px'),
    borderColor: '#DADADA',
    borderStyle: 'solid',
    borderRadius: format_number(4, 'px'),
    backgroundColor: '#FFFFFF',
    fontSize: format_number(12, 'px'),
    fontWeight: '500',
    color: '#999999',
    fontFamily: 'Roboto',
    flex: 1,
    paddingTop: format_number(13, 'px'),
    paddingBottom: format_number(13, 'px'),
    paddingLeft: format_number(15, 'px')
  },
  inputContainer: {
    paddingBottom: format_number(5, 'px')
  }
}
