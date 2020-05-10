// Libraries
import React from 'react'

export default ({ onClickTab, tab }) => <div className='tab'>
  <div className='tabItem active' onClick={() => { if (tab > 0) onClickTab(0) }}>
    <div className={tab === 0 ? 'tabIcon active' : 'tabIcon'}>
      <i className='ion-checkmark-round' />
    </div>
    <span className='tabStep'>FIRST STEP</span><br />
    <span className='tabTittle'>Payment Amount</span>
  </div>
  <div className='tabItem' onClick={() => { if (tab > 1) onClickTab(1) }}>
    <div className={tab === 1 ? 'tabIcon active' : 'tabIcon'}>
      <i className='ion-card' />
    </div>
    <span className='tabStep'>SECOND STEP</span><br />
    <span className='tabTittle'>Payment Method</span>
  </div>
  <div className='tabItem' >
    <div className={tab === 2 ? 'tabIcon active' : 'tabIcon'}>
      <i className='ion-checkmark-round' />
    </div>
    <span className='tabStep'>THIRD STEP</span><br />
    <span className='tabTittle'>Confirmation</span>
  </div>
</div>
