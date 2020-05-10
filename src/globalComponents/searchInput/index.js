// Libraries
import React from 'react'

// Styles
import './index.css'

export default props => <div className='SearchInput'>
  <input name='search' autoComplete='nope' className='search-input' type='text' onChange={props.onChange} placeholder='Search' value={props.value} />
  <i className='search-img ion-android-search' />
</div>
