// Create a Component for display the menu
// Importing all the neccesary Libraries

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import Icon from '../globalComponents/CustomIcon'
// import Menu, { /* MenuContext, */ MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu'

// Utils
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

export default class AllStatusComponent extends React.Component {
  render () {
    const {
      title
      // icons,
      // clickable
    } = this.props
    return <View style={styles.viewContainer}>
      <Text style={styles.textStatus}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        {/* <Menu onSelect={(value) => window.alert(`User selected the number ${value}`)}>
          <MenuTrigger>
            <Text style={{ fontSize: 20 }}>&#8942</Text>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.drownDownStyle}>
            <MenuOption value={1}>
              <StatusComponent title='allstatuses' showCircle={false} buttonSelected />
            </MenuOption>
            <MenuOption value={2}>
              <StatusComponent title='scheduled' showCircle={false} circleColor={{backgroundColor: 'red'}} buttonSelected={false} />
            </MenuOption>
            <MenuOption value={3}>
              <StatusComponent title='pending' showCircle circleColor={{backgroundColor: 'orange'}} buttonSelected={false} />
            </MenuOption>
            <MenuOption value={4}>
              <StatusComponent title='late' showCircle circleColor={{backgroundColor: 'red'}} buttonSelected={false} />
            </MenuOption>
            <MenuOption value={5}>
              <StatusComponent title='in process' showCircle circleColor={{backgroundColor: 'lightblue'}} buttonSelected={false} />
            </MenuOption>
          </MenuOptions>
        </Menu> */}
      </View>
    </View>
  }
}

/**
  <Icon backgroundColor='#FFF' name={icons} size={22} color='#999' />
*/
const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStatus: {
    color: '#999999',
    fontSize: format_number(12, 'px'),
    fontFamily: 'Roboto',
    marginRight: format_number(10, 'px')
  },
  drownDownStyle: {
    width: format_number(140, 'px')
  }
})
