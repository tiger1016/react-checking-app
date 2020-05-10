// Libraries
import React from 'react'
import MediaQuery from 'react-responsive'
import StyleSheet from 'react-native/dist/exports/StyleSheet'
import View from 'react-native/dist/exports/View'

// Controllers
import { appController } from 'Controllers'

const resolvedStyle = (process.env.PLATFORM_ENV && process.env.PLATFORM_ENV === 'web') ? 'containerWeb' : 'containerNative'

export default (props) => <MediaQuery maxWidth={appController.constants.TABLET_BREAKPOINT}>
  <View style={[styles[resolvedStyle], props.style]}>
    {props.children}
  </View>
</MediaQuery>

const styles = StyleSheet.create({
  containerNative: {
    flex: 1
  },
  containerWeb: {
    width: '100%',
    height: '100%'
  }
})
