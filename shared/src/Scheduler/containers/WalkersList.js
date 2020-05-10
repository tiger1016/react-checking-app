// Libraries
import React from 'react'
import { ListView, StyleSheet, Text, View } from 'react-native'

// Utils
import { logger } from '../../../utils'

// Components
import DaySlot from './DaySlot'
import TimeSlot from './TimeSlot'

export default class WalkersList extends React.Component {
  constructor () {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  _renderDay = (day, sectionId, rowId) => <View style={{ width: '100%' }}>
    <DaySlot openModal={this.props.openModal} setSlotOffset={this.props.setSlotOffset} rowId={rowId} day={day.date} walkers={day.walkers} />
  </View>

  _renderTime = (time, sectionId, rowId) => <View style={{ width: '100%' }}>
    <TimeSlot openModal={this.props.openModal} setSlotOffset={this.props.setSlotOffset} rowId={rowId} time={time.hour} walks={time.walks} />
  </View>

  render () {
    logger.rlog('<WalkersList />', this)
    if (this.props.items.constructor === Array && typeof this.props.items.length) {
      return <ListView
        dataSource={this.ds.cloneWithRows(this.props.items)}
        renderRow={this.props.mode === 'week' ? this._renderDay : this._renderTime}
        ref={ref => this.props.setListViewRef(ref)}
        style={styles.container}
      />
    }
    return <Text>Loading walker list...</Text>
  }
}

const styles = StyleSheet.create({
  listView: {
    // flex: 1
  }
})
