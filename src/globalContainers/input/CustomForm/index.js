// Libraries
import React from 'react'

// Styles
import './index.css'

export default props => <div className='custom-form-container'>
  <form>
    <div className='custom-form-inner-container'>
      {props.children}
    </div>
  </form>
</div>
