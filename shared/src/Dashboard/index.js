// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Alert, Text, View } from 'react-native'
// import { Constants, BarCodeScanner, Permissions } from 'expo'

// Styles
// import '../scheduler/styles/style.less'
// import './styles/dashboard.less'

// Components
import Button from '../globalComponents/Button'
// import BusinessSnapshot from './components/BusinessSnapshot'
// import BusyHours from './components/BusyHours'
// import CustomerBase from './components/CustomerBase'
// import DailySnapshot from './components/DailySnapshot'
// import Revenue from './components/Revenue'
// import TopZips from './components/TopZips'
// import Data from './container/Data'

// Actions
import { appController } from 'Controllers/appController'

class Dashboard extends React.Component {
  state = {
    hasCameraPermission: null
  }

  componentDidMount () {
    this.requestCameraPermission()
  }

  requestCameraPermission = async () => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA)
    // this.setState({
    //   hasCameraPermission: status === 'granted'
    // })
  };

  componentWillMount () {
    // this.props.dailySnapshot()
    // this.props.busyHours()
    // this.props.revenue()
    // this.props.customerBase()
    // this.props.businessSnapshot()
    // this.props.topZips()
  }

  handleBarCodeRead = data => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    )
  }

  render () {
    return (<View className='Dashboard'>
      <View>
        <Text>Dashboard</Text>
      </View>
      <Button
        onPress={() => { appController.confirmSaveChanges() }}
        text='alert' />
      {/* {this.state.hasCameraPermission === null
        ? <Text>Requesting for camera permission</Text>
        : this.state.hasCameraPermission === false
          ? <Text>Camera permission is not granted</Text>
          : <BarCodeScanner
            onBarCodeRead={this.handleBarCodeRead}
            style={{ height: 200, width: 200 }}
          />
      } */}
    </View>
    // <div className='dashboard-container'>
    //   <Data dataName='Daily SnapShot'>
    //     {dashboard.dailySnapshotLoading === false
    //       ? <DailySnapshot {...this.props} />
    //       : <div>
    //         {dashboard.dailySnapshotLoading ? 'LOADING' : 'ERROR'}
    //       </div>
    //     }
    //   </Data>
    //   <Data dataName='Busy Hours Today' dashItem={'busy-hours'}>
    //     {dashboard.busyHoursLoading === false
    //       ? <BusyHours {...this.props} />
    //       : <div>
    //         {dashboard.busyHoursLoading ? 'LOADING' : 'ERROR'}
    //       </div>
    //     }
    //   </Data>
    //   <Data dataName='Revenue'>
    //     {dashboard.revenueLoading === false
    //       ? <Revenue {...this.props} />
    //       : <div>
    //         {dashboard.revenueLoading ? 'LOADING' : 'ERROR'}
    //       </div>
    //     }
    //   </Data>
    //   <Data dataName='Customer Base'>
    //     {dashboard.customerBaseLoading === false
    //       ? <CustomerBase {...this.props} />
    //       : <div>
    //         {dashboard.customerBaseLoading ? 'LOADING' : 'ERROR'}
    //       </div>
    //     }
    //   </Data>
    //   <Data dataName='Business Snapshot' >
    //     {dashboard.businessSnapshotLoading === false
    //       ? <BusinessSnapshot{...this.props} />
    //       : <div>
    //         {dashboard.businessSnapshotLoading ? 'LOADING' : 'ERROR'}
    //       </div>
    //     }
    //   </Data>
    //   <Data dataName='Top Zip Codes'>
    //     {dashboard.topZipsLoading === false
    //       ? <TopZips{...this.props} />
    //       : <div>
    //         {dashboard.topZipsLoading ? 'LOADING' : 'ERROR'}
    //       </div>
    //     }
    //   </Data>
    // </div>
    )
  }
}

export default connect(
  state => {
    return {
      dashboard: state.dashboard
    }
  },
  dispatch => ({
    dispatch
  })
)(Dashboard)
