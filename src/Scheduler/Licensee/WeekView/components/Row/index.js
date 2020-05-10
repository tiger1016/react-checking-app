// Libraries
import React from 'react'
import moment from 'moment'

// Components
import Column from '../Column'
import FirstColumn from '../FirstColumn'

// Styles
import './index.css'

export default class Row extends React.Component {
  bgCalculator (y) {
    return y % 2 === 1 ? 'dark' : 'light'
  }
  columns () {
    const { columnIds, rowId, rowIndex, walkerData } = this.props
    let walks = []
    return columnIds.map((columnId) => {
      walks = walkerData.walks.filter(w => moment(w.requested_time).isSame(moment(columnId), 'day'))
      if (walks.length > 1) {
        walks = walks.sort((a, b) => moment(a.requested_time).isAfter(moment(b.requested_time)) ? 1 : -1)
      }

      return <Column
        bg={Number(rowId) === 0 ? 'yellow' : this.bgCalculator(rowIndex)}
        columnId={columnId}
        key={`column-${rowId}@${columnId}`}
        rowId={rowId}
        walks={walks}
      />
    })
  }
  render () {
    const { lastSelected, onlyFirstColumns, rowId, rowIndex, walkerData } = this.props
    return (
      <div ref='row' id={`row-${rowId}`} className='grid-row'>
        <FirstColumn bg={this.bgCalculator(rowIndex)} onlyFirstColumns={onlyFirstColumns} walker={walkerData} />
        {onlyFirstColumns || this.columns()}
        <div style={{ float: 'none', clear: 'both' }} />
        {lastSelected && <div style={{
          borderBottom: '3px dashed #1875F0',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0
        }} />}
      </div>
    )
  }
}
