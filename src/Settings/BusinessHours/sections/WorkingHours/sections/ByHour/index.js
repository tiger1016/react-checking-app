import React from 'react'

// Components
import TableInputGroup from 'GlobalComponents/input/TableInputGroup'

export default props => <div id='ByHour'>
  <div className='full-width-section'>
    <TableInputGroup reduxForm rows={[
      {
        columns: [
          { width: '120px', type: 'checkbox', label: 'Mondays', name: 'mondays' },
          { width: '240px', type: 'hour-minute', hourName: 'moday-open-at-hour', minuteName: 'mondays-open-at-minute' },
          { width: '200px', type: 'hour-minute', hourName: 'moday-close-at-hour', minuteName: 'mondays-close-at-minute' }
        ]
      },
      {
        columns: [
          { width: '120px', type: 'checkbox', label: 'Tuesdays', name: 'tuesdays' },
          { width: '240px', type: 'hour-minute', hourName: 'tuesdays-open-at-hour', minuteName: 'tuesdays-open-at-minute' },
          { width: '200px', type: 'hour-minute', hourName: 'tuesdays-close-at-hour', minuteName: 'tuesdays-close-at-minute' }
        ]
      },
      {
        columns: [
          { width: '120px', type: 'checkbox', label: 'Wednesdays', name: 'wednesdays' },
          { width: '240px', type: 'hour-minute', hourName: 'wednesdays-open-at-hour', minuteName: 'wednesdays-open-at-minute' },
          { width: '200px', type: 'hour-minute', hourName: 'wednesdays-close-at-hour', minuteName: 'wednesdays-close-at-minute' }
        ]
      },
      {
        columns: [
          { width: '120px', type: 'checkbox', label: 'Thursdays', name: 'thursday' },
          { width: '240px', type: 'hour-minute', hourName: 'thursday-open-at-hour', minuteName: 'thursday-open-at-minute' },
          { width: '200px', type: 'hour-minute', hourName: 'thursday-close-at-hour', minuteName: 'thursday-close-at-minute' }
        ]
      },
      {
        columns: [
          { width: '120px', type: 'checkbox', label: 'Fridays', name: 'fridays' },
          { width: '240px', type: 'hour-minute', hourName: 'fridays-open-at-hour', minuteName: 'fridays-open-at-minute' },
          { width: '200px', type: 'hour-minute', hourName: 'fridays-close-at-hour', minuteName: 'fridays-close-at-minute' }
        ]
      },
      {
        columns: [
          { width: '120px', type: 'checkbox', label: 'Saturdays', name: 'saturdays' },
          { width: '240px', type: 'hour-minute', hourName: 'saturdays-open-at-hour', minuteName: 'saturdays-open-at-minute' },
          { width: '200px', type: 'hour-minute', hourName: 'saturdays-close-at-hour', minuteName: 'saturdays-close-at-minute' }
        ]
      },
      {
        columns: [
          { width: '120px', type: 'checkbox', label: 'Sundays', name: 'sundays' },
          { width: '240px', type: 'hour-minute', hourName: 'sundays-open-at-hour', minuteName: 'sundays-open-at-minute' },
          { width: '200px', type: 'hour-minute', hourName: 'sundays-close-at-hour', minuteName: 'sundays-close-at-minute' }
        ]
      }
    ]} headerRow={[
      { width: '120px', type: 'header-text', value: 'WORK DAY' },
      { width: '240px', type: 'header-text', value: 'OPEN AT' },
      { width: '200px', type: 'header-text', value: 'CLOSE AT' }
    ]} pushedLeft />
  </div>
</div>
