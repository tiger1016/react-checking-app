// Libraries
import React, { Component } from 'react'

import SearchImage from '../../../assets/searchImage.png'

export class SearchComponent extends Component {
  render () {
    return (
      <div className='search-bar'>
        <input className='search-placeholder' type='text' name='search'
          placeholder='Search' />
        <div className='icon-customer'>
          <img className='search-image-staff' src={SearchImage} />
        </div>
      </div>
    )
  }
}
