// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Styles
import './style.less'

// Components
import { StaffProfilePage } from './components/StaffProfilePage'
import { PayrollReport } from './components/staffDetail/PayrollReport'
import { PayrollRates } from './components/staffDetail/PayrollRates'

import { Tab } from './components/tabComponent/Tab'

// Actions
// import walkersActions from '../../actions/walkers';
// import walkerProfileActions from '../../actions/walkers/walkerProfile'
// import walkerPayrateActions from '../../actions/walkers/walkerPayrate'
// import walkerPayrollActions from '../../actions/walkers/walkerPayroll'

class staffProfile extends Component {
  componentWillMount () {
    this.props.walkerPayrateActions.fetchWalkerPayRate(this.props.match.params.id)
    this.props.walkerPayrollActions.fetchWalkerPayRoll(this.props.match.params.id)
    // this.props.walkerProfileActions.fetchWalker(this.props.match.params.id);
  }

  moveBack () {
    this.props.history.goBack()
  }

  render () {
    const walkerPayroll = this.props.walkerPayroll.payrolls
    const walkerPayrate = this.props.walkerPayrate.payrates
    const walkerProfile = this.props.walkerProfile.find(x => Number(x.id) === Number(this.props.match.params.id))
    const tabs = [
      { title: 'Profile', content: (<StaffProfilePage walkerProfileActions={this.props.walkerProfileActions} walkerid={this.props.match.params.id} walkerProfile={walkerProfile} />) },
      { title: 'Payroll Reports', content: (<PayrollReport walkerid={this.props.match.params.id} walkerPayroll={walkerPayroll} />) },
      { title: 'Pay Rates', content: (<PayrollRates walkerPayrateActions={this.props.walkerPayrateActions} walkerid={this.props.match.params.id} walkerPayrate={walkerPayrate} />) }
    ].map(tab => {
      return Object.assign({}, tab)
    })

    return (
      <div>
        <div className='cus-header-top'>
          <span className='ion-arrow-left-c arrow-icon' onClick={() => { this.moveBack() }} />
          <span className='title-text'>{walkerProfile.first_name} {walkerProfile.last_name}</span>
          <span className='icon-display'><span className='ion-person-add icon-circle' /> </span>
          <span className='icon-display-cal'><span className='ion-calendar icon-circle' /></span>
        </div>
        <Tab tabs={tabs} />
      </div>
    )
  }
}
function mapStateToProps (state, ownProps) {
  return {
    walkerPayroll: state.walkerPayroll.walkerPayroll,
    walkerPayrate: state.walkerPayrate.walkerPayrate,
    walkerProfile: state.walkers.walkers
  }
}

export default connect(
  mapStateToProps
  // dispatch => ({
  //   walkerProfileActions: bindActionCreators(walkerProfileActions, dispatch),
  //   walkerPayrateActions: bindActionCreators(walkerPayrateActions, dispatch),
  //   walkerPayrollActions: bindActionCreators(walkerPayrollActions, dispatch),
  //   dispatch
  // })
)(staffProfile)
