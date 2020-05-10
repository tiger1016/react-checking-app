// Libraries
import React from 'react'

export default props => <button style={styles.btnPrimary} id={props.id} onClick={props.onClick} >{props.text}</button>

const styles = {
  btnPrimary: {
    'backgroundColor': '#3DA647',
    'fontSize': '9.5px',
    'fontWeight': '500',
    'fontFamily': 'Roboto',
    'border': '1px solid transparent',
    'borderRadius': '4px',
    'color': '#FFFFFF',
    'height': '38px',
    'width': '15%',
    'margin': '18px',
    'float': 'right',
    'textTransform': 'uppercase',
    'letter-spacing': '1px'
  }
}
