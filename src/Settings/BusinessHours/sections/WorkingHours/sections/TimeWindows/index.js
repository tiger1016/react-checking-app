import React from 'react'

// Components
import TableInputGroup from 'GlobalComponents/input/TableInputGroup'

// Styles
import './index.css'

export default props => <div id='TimeWindows'>
  <div className='full-width-section'>
    <TableInputGroup reduxForm rows={[
      {
        columns: [
          { width: '40px', type: 'checkbox', label: 'Monday', name: 'mondays', vAlign: 'top' },
          [
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' },
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' }
          ]
        ]
      },
      {
        columns: [
          { width: '40px', type: 'checkbox', label: 'Tuesday', name: 'tuesday', vAlign: 'top' },
          [
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' },
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' }
          ]
        ]
      },
      {
        columns: [
          { width: '40px', type: 'checkbox', label: 'Wednesday', name: 'wednesday', vAlign: 'top' },
          [
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' },
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' }
          ]
        ]
      },
      {
        columns: [
          { width: '40px', type: 'checkbox', label: 'Thursday', name: 'thursday', vAlign: 'top' },
          [
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' },
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' }
          ]
        ]
      },
      {
        columns: [
          { width: '40px', type: 'checkbox', label: 'Friday', name: 'fridaa', vAlign: 'top' },
          [
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' },
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' }
          ]
        ]
      },
      {
        columns: [
          { width: '40px', type: 'checkbox', label: 'Saturday', name: 'saturday', vAlign: 'top' },
          [
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' },
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' }
          ]
        ]
      },
      {
        columns: [
          { width: '40px', type: 'checkbox', label: 'Sunday', name: 'sunday', vAlign: 'top' },
          [
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' },
            { width: '420px', type: 'time-range', hourStartName: 'hour-start-name-1', minuteStartName: 'minute-start-name-1', hourEndName: 'hour-end-name', minuteEndName: 'minute-end-name' }
          ]
        ]
      }
    ]} headerRow={[
      { width: '40px', type: 'header-text', value: 'WORK DAY' },
      { width: '420px', type: 'header-text', value: 'TIME SLOTS' }
    ]} notStripped />
  </div>
</div>
