// Libraries
import React from 'react'

export default props => <button style={styles.btnLight} id={props.id} onClick={props.onClick}>{props.text}</button>

const styles = {
  btnLight: {
    backgroundColor: '#7D7D7D',
    fontSize: '9.5px',
    fontWeight: '900',
    'fontFamily': 'Roboto',
    'border': '1px solid transparent',
    'borderRadius': '4px',
    'color': '#FFFFFF',
    'height': '38px',
    'width': '15%',
    'margin': '18px',
    'float': 'right',
    'textTransform': 'uppercase'
  }
}
