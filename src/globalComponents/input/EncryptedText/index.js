// Libraries
import React from 'react'

// Styles
import './index.css'

const encryptedText = (count) => '*'.repeat(count)

export default props => <span className={`EncryptedText`}>
  {encryptedText(props.count)}
</span>
