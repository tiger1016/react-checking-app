// Libraries
import React from 'react'

// Styles
import './index.css'

export default props => <div className={`SectionBody${props.noPadding ? ' no-padding' : ''}${props.noVPadding ? ' no-v-padding' : ''}${props.noHPadding ? ' no-h-padding' : ''}`}>
  {props.children}
</div>
