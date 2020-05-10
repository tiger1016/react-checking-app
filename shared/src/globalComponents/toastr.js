// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'

// Actions
import toastrActions from '../../actions/toastr'

import './toastr.less'

class Toastr extends React.Component {
  render () {
    // debugger
    // alert(this.props.toastr.type+':'+this.props.toastr.isActive)
    const isActive = classNames(this.props.toastr.type, { active: this.props.toastr.isActive })

    return <div id='toastr' className={isActive} >{this.props.toastr.msg}</div>
  }
}

function mapStateToProps (state, ownProps) {
  return {
    toastr: state.toastr
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    toastrActions: bindActionCreators(toastrActions, dispatch),
    dispatch
  })
)(Toastr)
