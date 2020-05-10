// Libraries
import React from 'react'
import { Image, View } from 'react-native'
// import Modal from 'react-modal'
// import moment from 'moment'
// import _ from 'lodash'
// import Icon from '../globalComponents/CustomIcon'
// import { TabViewAnimated, TabBar } from 'react-native-tab-view'

// Components
// import CustomSelect from './CustomSelect'
// import CustomCheckBoxList from './CustomCheckBoxList'
// import TimePickerModal from './TimePickerModal'

// Utils
import { logger } from '../../../../utils'
import format_number from '../../../../utils/format_number' // eslint-disable-line camelcase

export default class ModalPhotoGallery extends React.Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    logger.rlog('<ModalPhotoGallery />', this)
    return <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: format_number(13, 'px'), marginRight: format_number(13, 'px'), marginBottom: format_number(20, 'px') }}>
      {this.props.photos.map(p => <View key={`image:${p.id}`} style={{ height: '150px', width: '48%' }}>
        <Image style={{ width: '100%', height: '100%' }} source={{ uri: p.path }} resizeMode={'contain'} />
      </View>)}
    </View>
  }
}

// const styles = StyleSheet.create({
// })
