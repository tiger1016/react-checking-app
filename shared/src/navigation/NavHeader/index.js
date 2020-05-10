import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from '../../globalComponents/CustomIcon'
import ProfilePic from '../../../assets/blank-profile-picture.png'
export default props => <View style={styles.container}>
  <View style={styles.left}><TouchableOpacity onPress={props.openSideBar} ><Icon name='ios-menu' size={24} color='white' /></TouchableOpacity></View>
  <View style={styles.title}><Text style={styles.text}>{props.title}</Text></View>
  <View style={styles.right}><TouchableOpacity onPress={() => { props.history.push('alerts') }} ><Icon MainViewStyle={{ marginRight: 10 }} name='ios-notifications' BadgeCount={3} size={22} color='white' /></TouchableOpacity><TouchableOpacity onPress={() => { props.history.push('profile') }} ><Image style={styles.image} source={ProfilePic} /></TouchableOpacity></View>
</View>

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'rgb(24, 117, 240)',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: 'white'
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  left: {
    flex: 0.2,
    alignItems: 'center'
  },
  title: {
    flex: 0.6,
    alignItems: 'center'
  },
  right: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
