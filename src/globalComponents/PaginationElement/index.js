// Libraries
import React from 'react'

// Utils
import { utility } from 'Utils/utility'

// Styles
import './index.css'

export const paginate = (array, pageSize, pageNumber) => {
  --pageNumber
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
}

export default class PaginationElement extends React.Component {
  constructor () {
    super()
    this.state = {
      currentPage: 1
    }
  }

  /**
   * Changes page
   * @param  {Number} currentPage page to change to
   * @return {Void}
   */
  changePageTo = currentPage => {
    if (currentPage > this.props.totalPages || currentPage < 1) {
      return
    }
    this.setState({ currentPage }, () => {
      if (utility.isAFunction(this.props.onPageChange)) {
        this.props.onPageChange(this.state.currentPage)
      }
    })
  }

  /**
   * Handles pagination numbering
   * @param  {[type]} totalPages  [description]
   * @param  {[type]} currentPage [description]
   * @return {[type]}             [description]
   */
  expandPagesFromTotal = () => {
    let currentPage = this.state.currentPage
    let totalPages = this.props.totalPages

    // Current page defaults to 1
    currentPage = currentPage || 1

    if (!totalPages) {
      return [1]
    }

    // If less than 10 pages show all
    if (totalPages < 10) {
      let pages = []
      let i = 1
      while (i < totalPages + 1) {
        pages.push(i)
        i++
      }
      return pages
    }

    // <- |1|, 2, 3, 4 ..., 24 ->
    if (currentPage === 1) {
      return [ currentPage, currentPage + 1, currentPage + 2, currentPage + 3, -6, totalPages ]
    }
    // <- 1, |2|, 3, 4 ..., 24 ->
    if (currentPage === 2) {
      return [ currentPage - 1, currentPage, currentPage + 1, currentPage + 2, -6, totalPages ]
    }

    // <- 1, 2, |3|, 4 ..., 24 ->
    if (currentPage < totalPages - 3) {
      return [ currentPage - 2, currentPage - 1, currentPage, currentPage + 1, -6, totalPages ]
    }

    // <- 1, ..., |21|, 22, 23 , 24 ->
    if (currentPage === totalPages - 3) {
      return [1, -6, currentPage, currentPage + 1, currentPage + 2, totalPages]
    }

    // <- 1, ..., 21, |22|, 23 , 24 ->
    if (currentPage === totalPages - 2) {
      return [1, -6, currentPage - 1, currentPage, currentPage + 1, totalPages]
    }

    // <- 1, ..., 21, 22, 23 , |24| ->
    if (currentPage === totalPages) {
      return [1, -6, currentPage - 3, currentPage - 2, currentPage - 1, totalPages]
    }

    // <- 1, ..., 21, 22, |23| , 24 ->
    return [1, -6, currentPage - 2, currentPage - 1, currentPage, totalPages]
  }

  render () {
    let pages = this.expandPagesFromTotal()
    return <div className='pagination-element-container'>
      <ul>
        <li>
          <a onClick={() => this.changePageTo(this.state.currentPage - 1)}><i className='ion-android-arrow-back' /></a>
        </li>
        {pages.map(pageNumber => <li key={pageNumber} className={this.state.currentPage === pageNumber ? 'active' : ''}>
          <a className={`${Number(pageNumber) === -6 ? 'disabled' : ''}`} onClick={() => this.changePageTo(Number(pageNumber))}>
            {Number(pageNumber) === -6 ? '...' : pageNumber }
          </a>
        </li>)}
        <li>
          <a onClick={() => this.changePageTo(this.state.currentPage + 1)}><i className='ion-android-arrow-forward' /></a>
        </li>
      </ul>
    </div>
  }
}
