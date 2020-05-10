// Libraries
import React from 'react'

// Components
import FullScreenTextOnly from 'GlobalComponents/FullScreenTextOnly'

export default props => {
  if (props.error) {
    console.error(props.error)
    return <FullScreenTextOnly error text={props.error.toString()} action={props.action} />
  } else if (props.pastDelay) {
    return <FullScreenTextOnly text='Loading' spinner />
  }
  return null
}
