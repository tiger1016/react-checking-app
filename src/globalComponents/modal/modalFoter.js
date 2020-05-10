// Libraries
import React from 'react'

export default props => <div style={styles.foter}>
  {props.children}
</div>

const styles = {
  foter: {
    'position': 'absolute',
    'bottom': '1px',
    'left': '0',
    'width': '100%',
    'height': '75px',
    'borderTop': '2px solid #F5F5F5',
    'background': 'white'
  }

}
