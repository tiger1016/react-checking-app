// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

// Styles

import './styles.less'
// Components
// Components
import { Row } from './dataTables/Row'
import { SearchComponent } from './components/SearchComponent'

// Actions
import walkersActions from '../../actions/walkers'

class Staff extends Component {
  componentWillMount () {
    this.props.walkersActions.fetchWalkers()
  }

  render () {
    return (
      <div className='staff-container'>
        <button className='create-button btn'> + </button>
        <div className='header-container'>
          <div className='header-top' />
          <SearchComponent />
        </div>
        <div className='body-container'>
          {/* <RowHeader   /> */}
          <div className='row-scroll'>
            {this.props.staffsData.walkers.filter(function (walker, index) {
              if (Number(index) !== 0) return true
              else return false
            }).map(walker =>
              <div className='table-row' key={walker.id} >
                <Link to={'/walker/' + walker.id} className='line-removal'>
                  <Row walker={walker} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps (state, ownProps) {
  return { staffsData: state.walkers }
}
export default connect(
  mapStateToProps,
  dispatch => ({
    walkersActions: bindActionCreators(walkersActions, dispatch),
    dispatch
  })
)(Staff)
