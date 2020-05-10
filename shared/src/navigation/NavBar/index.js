import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TouchableHighlight, Animated, Easing } from 'react-native'
// import Gesture from '../Gesture';
import Icon from '../../globalComponents/CustomIcon'

export default class NavBar extends React.Component {
  constructor () {
    super()
    this.state = {
      isMenuOpen: false,
      menuOffset: new Animated.Value(Dimensions.get('window').width)
    }
  }

  toggleMenu = () => {
    this.setState(state => {
      const isOpen = state.menuOffset._value === 0
      Animated.timing(
        state.menuOffset,
        {
          toValue: isOpen ? Dimensions.get('window').width : 0,
          duration: 50,
          easing: Easing.linear
        }
      ).start()
      return { isMenuOpen: !isOpen }
    })
  }

  changeRoute = (route) => {
    this.props.history.push(route)
    this.toggleMenu()
  }

  render () {
    return <Animated.View
      style={[styles.menu, { right: this.state.menuOffset }]} >
      <View style={styles.container}>
        <View style={styles.cross}><TouchableOpacity onPress={this.toggleMenu}><View style={{ paddingRight: 10, paddingLeft: 10 }}><Icon name='ios-close' size={24} color='white' /></View></TouchableOpacity></View>
        <View style={styles.body}>
          <ScrollView style={styles.scrollView} automaticallyAdjustContentInsets={false}>
            {this._renderRows()}
          </ScrollView>
        </View>
      </View>
      <TouchableHighlight onPress={this.toggleMenu}><View style={styles.overlay} ><Text /></View></TouchableHighlight>
    </Animated.View>
  }

  _renderRows = () => {
    return this.props.routes.map((item, i) => {
      return <TouchableHighlight key={'row-' + i} onPress={() => { this.changeRoute(item.route) }}>
        <View>
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.name}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    })
  }
}
const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    width: Dimensions.get('window').width
  },
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'rgba(24, 117, 240, 0.8)',
    alignItems: 'center',
    flexDirection: 'column'
  },
  overlay: {
    height: Dimensions.get('window').height,
    width: 100
  },
  scrollView: {
    height: Dimensions.get('window').height - 44
  },
  body: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 44
  },
  cross: {
    padding: 10,
    width: Dimensions.get('window').width - 100,
    alignItems: 'flex-end'
  },
  rowText: {
    color: 'white'
  },
  separator: {
    height: 0.8,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  row: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center'
  }
})
