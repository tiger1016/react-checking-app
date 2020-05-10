// Libraries
import React from 'react'

export default props => <div style={styles.container}>
  <div style={{ ...styles.message, background: props.bg ? props.bg : 'rgba(51,51,51,.8)' }}>
    <span style={styles.text}>{props.text}</span>
  </div>
</div>

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    padding: '15px',
    margin: '15px',
    borderRadius: '4px'
  },
  text: {
    color: '#FFF',
    fontSize: '1em'
  }
}
