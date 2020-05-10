// Libraries
import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import moment from 'moment'
import _ from 'lodash'
import { isWeb } from '../../../helpers'
import Icon from '../../globalComponents/CustomIcon'
import { TabView } from '../../globalComponents/TabView'
import { connect } from 'react-redux'
// Components
import CustomSelect from './components/CustomSelect'
import CustomCheckBoxList from './components/CustomCheckBoxList'
import CustomButton from './components/CustomButton'
import ModalPhotoGallery from './components/ModalPhotoGallery'
import GMaps from './components/Gmaps'

// Utils
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

// Controller
import { customersController, appController } from '../../../controllers'
class WalkModal extends React.Component {
  constructor () {
    super()
    this.fuse = null
    this.state = {
      addons: [],
      customer_info: null,
      datePickerIsOpen: false,
      days: [],
      end: null,
      error: null,
      frequency: { value: '', label: '' },
      hour: { value: null, label: '' },
      index: 0,
      meridian: { value: null, label: '' },
      minute: { value: null, label: '' },
      pets: [],
      photos: [],
      routes: [
        { key: '1', title: 'Details' },
        { key: '2', title: 'Map & Photos' }
      ],
      selectedDays: [],
      service: { value: null, label: '' },
      start: null,
      walkPath: []
    }
    this.frequencies = [
      { label: '', value: '' },
      { label: 'Recurring Weekly', value: 'weekly' },
      { label: 'Recurring Bi-Weekly', value: 'biweekly' },
      { label: 'Recurring Monthly', value: 'monthly' },
      { label: 'One Time', value: 'once' }
    ]
    this.petsLoading = false
    this.updateWalkObject = {
      customer_id: 0,
      licensee_id: 0,
      requested_time: null,
      billing_price_group_id: 0,
      discount_type: null,
      discount_amount: 0.00,
      addons: 0,
      dogs: 0,
      walker_id: 0,
      frequency: '',
      days: '',
      apply_to_all: 0,
      time_zone: '',
      walk_id: 0,
      requested_by: 0,
      ts: null,
      end_date: null,
      original_service_date: null,
      customer_comments: '',
      status: 'pending'
    }
  }

  componentWillReceiveProps (nextProps) {
    // if (!_.isEqual(this.props.customers.customers, nextProps.customers.customers) && nextProps.customers) {
    //   let customers = nextProps.customers.customers
    //   customers = _.filter(customers, customer => {
    //     return customer.customer_id === this.props.app.modal.data.walk.customer_id
    //   })
    //   let customer_info = customers[0]
    //   this.setState({customer_info})
    // }

  }

  closeModal = () => appController.closeModal()

  _handleChangeTab = index => {
    this.setState({ index })
  }

  _modalContent = () => <View style={{ flex: 1 }}>
    <TouchableOpacity style={styles.closeContainer} onPress={this.closeModal}>
      <Icon style={styles.close} name='md-close' size={20} color='#999' />
    </TouchableOpacity>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Appointment Details</Text>
      <Text style={styles.headerTitle}>
        {`${this.props.app.modal.data.walk.walker_name}, ${moment(this.props.app.modal.data.walk.requested_time).format('h a')}, ${moment(this.props.app.modal.data.walk.requested_time).format('MM/DD/YY')}`}
      </Text>
      <View style={{ width: format_number(19, 'px'), height: format_number(19, 'px'), borderWidth: format_number(1, 'px'), borderStyle: 'solid', borderColor: '#a3a3a3', borderRadius: format_number(19, 'px'), position: 'absolute' }} />
    </View>
    <TabView
      style={tabStyles.container}
      navigationState={this.state}
      renderScene={this._renderScene}
      renderHeader={this._renderHeader}
      onIndexChange={index => this.setState({ index })}
      onRequestChangeTab={this._handleChangeTab}
    />
  </View>

  _openDatePicker = () => this.setState({ datePickerIsOpen: true })

  _openHandler = () => {
    // Customer info
    customersController.actions.fetchCustomers()

    // Initial frequency value
    let frequency = this.frequencies.filter(frequency => frequency.value === this.props.app.modal.data.walk.frequency)
    frequency = frequency[0]
    this.setState({ frequency })

    // initial days value
    const today = moment(this.props.app.modal.data.walk.requested_time).format('dddd')
    this.setState({ days: [{ label: today, value: today.toLowerCase() }] })

    // Initial time value
    const hour = moment(this.props.app.modal.data.walk.requested_time).format('h')
    const minute = moment(this.props.app.modal.data.walk.requested_time).format('mm')
    const meridian = moment(this.props.app.modal.data.walk.requested_time).format('a')
    this.setState({
      hour: { label: hour, value: hour },
      minute: { label: minute, value: minute },
      meridian: { label: meridian.toUpperCase(), value: meridian.toLowerCase() }
    })

    // Start/end date initial value
    this.setState({ start: this.props.app.modal.data.walk.start })
    this.setState({ end: this.props.app.modal.data.walk.end })

    // Photos
    // var url = `photos/${this.props.app.modal.data.walk.walk_id}`
    // var url = `photos/25021364`
    // api.axios.get(url, {
    //   params: { jwt: api.jwt() }
    // }).then(response => {
    //   if (response && response.data && response.data.walks_photos) {
    //     logger.xlog('CustomModal fetchPhotos RESPONSE', response.data.walks_photos)
    //     this.setState({loading: false, photos: response.data.walks_photos})
    //   }
    //   logger.xlog('CustomModal fetchPhotos EMPTY response', response)
    //   this.setState({loading: false, errorMessage: 'No data available'})
    // }).catch(error => {
    //   logger.xlog('CustomModal fetchPhotos ERROR', error)
    //   this.setState({loading: false, errorMessage: error})
    // })

    // // Maps
    // // var url = `photos/${this.props.app.modal.data.walk.walk_id}`
    // var url = `maps/25021364`
    // api.axios.get(url, {
    //   params: { jwt: api.jwt() }
    // }).then(response => {
    //   if (response && response.data && response.data.gps) {
    //     logger.log('CustomModal fetchMap RESPONSE', response.data.gps)
    //     this.setState({loading: false, walkPath: response.data.gps})
    //   }
    //   logger.log('CustomModal fetchMap EMPTY response', response)
    //   this.setState({loading: false, errorMessage: 'No data available'})
    // }).catch(error => {
    //   logger.log('CustomModal fetchMap ERROR', error)
    //   this.setState({loading: false, errorMessage: error})
    // })
  }

  _renderHeader = (props) => {
    // return <TabBar renderIndicator={this._renderIndicator}renderLabel={this._renderLabel} {...props} indicatorStyle={tabStyles.indicator} style={tabStyles.tabBar} /* labelStyle={tabStyles.label} */ />
  }

  _renderIndicator = currentScene => {
    return <View style={{ height: 2, position: 'absolute', top: format_number(50, 'px'), width: '100%', backgroundColor: '#f5f5f5' }} />
  }

  _renderLabel = currentScene => {
    if (currentScene.focused) {
      return <View style={{ borderBottomWidth: 2, borderBottomColor: '#1875F0' }}><Text style={tabStyles.labelSelected}>{currentScene.route.title}</Text></View>
    }
    return <View><Text style={tabStyles.label}>{currentScene.route.title}</Text></View>
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return this._tabOne()
      case '2':
        return this._tabTwo()
      default:
        return null
    }
  }

  _saveUpdatedWalk = () => {
    this.props.dispatch(this.props.walksActions.updateWalk({
      updatedWalk: {
        walk_id: this.props.app.modal.data.walk.walk_id,
        pets: this.state.pets,
        walker_id: this.props.app.modal.data.walk.walker_id,
        frequency: this.state.frequency.value,
        billing_price_group_id: this.props.app.modal.data.walk.billing_price_group_id,
        customer: this.props.app.modal.data.walk.customer,
        requested_time: this.props.app.modal.data.walk.requested_time
      }
    }))
  }

  _selectDay = (day, mode) => {
    var startOfWeek = moment(day).startOf('week')
    var start = startOfWeek.format()
    var endOfWeek = moment(day).endOf('week')
    var end = endOfWeek.format()
    var selectedDays = []
    day = startOfWeek
    while (day <= endOfWeek) {
      selectedDays.push(day.toDate())
      day = day.clone().add(1, 'd')
    }
    if (mode === 'day') {
      startOfWeek = moment(day).startOf('day')
      start = startOfWeek.format()
      endOfWeek = moment(day).endOf('week')
      end = endOfWeek.format()
      selectedDays = [day]
    }
    // logger.log('Selected Days', selectedDays)
    this.setState({ start, end, selectedDays })
  }

  _setAddons = addon => {
    var ids = this.state.addons.map(i => i.id)
    var newAddons = this.state.addons.slice()
    if (_.includes(ids, addon.id)) {
      newAddons = _.filter(newAddons, a => a.id !== addon.id)
    } else {
      newAddons.push(addon)
    }
    this.setState({ addons: newAddons })
  }

  _setDay = days => {
    var newDays = days.slice()
    this.setState({ days: newDays })
  }

  _setFrequency = frequency => this.setState({ frequency })

  _setHour = hour => this.setState({ hour })

  _setMeridian = meridian => this.setState({ meridian })

  _setMinute = minute => this.setState({ minute })

  _setPets = pets => {
    var newPets = pets.slice()
    this.setState({ pets: newPets })
  }

  _setService = service => this.setState({ service })

  _tabOne = () => <ScrollView style={{ height: Dimensions.get('window').height - 200 }}><View style={{ flex: 1 }}>
    <View style={{ marginTop: format_number(20, 'px'), marginLeft: format_number(26, 'px'), marginRight: format_number(26, 'px') }}>
      <Text style={{ fontFamily: 'Roboto', color: '#666', fontSize: format_number(14, 'px') }}>{`Customer: ${this.props.app.modal.data.walk.customer_name}`}</Text>
      <Text style={{ color: 'rgb(153, 153, 153)', fontFamily: 'Roboto', fontSize: format_number(13, 'px') }}>
        {this.state.customer_info ? this.state.customer_info.address : ''}
      </Text>
      <Text style={{ color: 'rgb(153, 153, 153)', fontFamily: 'Roboto', fontSize: format_number(13, 'px') }}>
        {this.state.customer_info ? this.state.customer_info.address2 : ''}
      </Text>
      <Text style={{ color: 'rgb(153, 153, 153)', fontFamily: 'Roboto', fontSize: format_number(13, 'px'), marginBottom: format_number(10, 'px') }}>
        {this.state.customer_info ? `${this.state.customer_info.city} ${this.state.customer_info.state} ${this.state.customer_info.zip}` : ''}
      </Text>
    </View>
    {this.props.session.user.type === 2 ? <CustomSelect
      async
      multi
      endpoint='/pets'
      labelField='name'
      matchColumn='customer_id'
      matchValue={this.props.app.modal.data.walk.customer_id}
      name='pets'
      onChange={this._setPets}
      value={this.state.pets}
      valueField='id'
      // loadInitialValue={pets => {
      //   var p = this.props.app.modal.data.walk.pets.map(pet => ({value: pet.id, label: pet.name}))
      //   this.setState({pets: p})
      // }}
      containerStyle={styles.selectContainer}
      style={styles.select}
      placeholder='choose pets'
      icon={<Icon name='ios-paw' size={20} color='#D8D8D8' />}
    /> : <View style={styles.phContainer}>
      <Text style={styles.inputIcon}><Icon name='ios-paw' size={20} color='#D8D8D8' /></Text>
      <Text style={styles.ph}>{this.props.app.modal.data.walk && this.props.app.modal.data.walk.pets}</Text>
    </View>}
    {this.props.session.user.type === 2 ? <CustomSelect
      async
      endpoint='/services'
      labelField='dropdown_description'
      name='service'
      onChange={this._setService}
      value={this.state.service.value}
      valueField='id'
      loadInitialValue={services => {
        const service = services.filter(service => service.label === this.props.app.modal.data.walk.dropdown_description)
        this.setState({ service: service[0] })
      }}
      containerStyle={styles.selectContainer}
      style={styles.select}
      placeholder='choose service'
      icon={<Icon name='ios-checkmark' size={40} color='#D8D8D8' />}
    /> : <View style={styles.phContainer}>
      <Text style={[styles.inputIcon, { marginLeft: format_number(-8, 'px') }]}><Icon name='ios-checkmark' size={40} color='#D8D8D8' /></Text>
      <Text style={[styles.ph, { overflow: 'hidden' }]}>{this.props.app.modal.data.walk.dropdown_description}</Text>
    </View>}
    {this.props.session.user.type === 2 ? <CustomSelect
      name='frequency'
      onChange={this._setFrequency}
      options={this.frequencies}
      value={this.state.frequency.value}
      containerStyle={styles.selectContainer}
      style={styles.select}
      placeholder='choose frequency'
      icon={<Icon name='md-refresh' size={20} color='#D8D8D8' />}
    /> : <View style={styles.phContainer}>
      <Text style={styles.inputIcon}><Icon name='md-refresh' size={20} color='#D8D8D8' /></Text>
      <Text style={styles.ph}>{this.props.app.modal.data.walk.frequency}</Text>
    </View>}
    {this.props.session.user.type === 2 ? <CustomSelect
      name='day'
      multi
      onChange={this._setDay}
      options={[
        { label: 'Sunday', value: 'sunday' },
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' }

      ]}
      value={this.state.days}
      containerStyle={styles.selectContainer}
      style={styles.select}
      placeholder='choose days'
      icon={<Icon name='md-calendar' size={20} color='#D8D8D8' />}
    /> : <View style={styles.phContainer}>
      <Text style={styles.inputIcon}><Icon name='md-calendar' size={20} color='#D8D8D8' /></Text>
      <Text style={styles.ph}>{moment(this.props.app.modal.data.walk.requested_time).format('dddd')}</Text>
    </View>}
    <View style={{ flexDirection: 'row', alignItems: 'stretch', justifyContent: (Number(this.props.session.user.type) === 2 ? 'space-around' : 'flex-start'), marginLeft: format_number(26, 'px'), marginRight: format_number(26, 'px') }}>
      {this.props.session.user.type === 2 ? <CustomSelect
        name='hour'
        onChange={this._setHour}
        options={[
          { label: '12', value: '12' },
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
          { label: '6', value: '6' },
          { label: '7', value: '7' },
          { label: '8', value: '8' },
          { label: '9', value: '9' },
          { label: '10', value: '10' },
          { label: '11', value: '11' }
        ]}
        value={this.state.hour.value}
        containerStyle={{ ...styles.selectContainer, ...styles.oneThirdSelectContainer }}
        style={{ ...styles.select, ...styles.oneThirdSelect }}
        placeholder='hr'
        icon={<Icon name='md-calendar' size={20} color='#D8D8D8' />}
      /> : <View style={[styles.phContainer, styles.phT]}>
        <Text style={styles.inputIcon}><Icon name='md-calendar' size={20} color='#D8D8D8' /></Text>
        <Text style={styles.ph}>{moment(this.props.app.modal.data.walk.requested_time).format('hh') + ':'}</Text>
      </View>}
      {this.props.session.user.type === 2 ? <CustomSelect
        name='minute'
        onChange={this._setMinute}
        options={[
          { label: '00', value: '00' },
          { label: '01', value: '01' },
          { label: '02', value: '02' },
          { label: '03', value: '03' },
          { label: '04', value: '04' },
          { label: '05', value: '05' },
          { label: '06', value: '06' },
          { label: '07', value: '07' },
          { label: '08', value: '08' },
          { label: '09', value: '09' },
          { label: '10', value: '10' },
          { label: '11', value: '11' },
          { label: '12', value: '12' },
          { label: '13', value: '13' },
          { label: '14', value: '14' },
          { label: '15', value: '15' },
          { label: '16', value: '16' },
          { label: '17', value: '17' },
          { label: '18', value: '18' },
          { label: '19', value: '19' },
          { label: '20', value: '20' },
          { label: '21', value: '21' },
          { label: '22', value: '22' },
          { label: '23', value: '23' },
          { label: '24', value: '24' },
          { label: '25', value: '25' },
          { label: '26', value: '26' },
          { label: '27', value: '27' },
          { label: '28', value: '28' },
          { label: '29', value: '29' },
          { label: '30', value: '30' },
          { label: '31', value: '31' },
          { label: '32', value: '32' },
          { label: '33', value: '33' },
          { label: '34', value: '34' },
          { label: '35', value: '35' },
          { label: '36', value: '36' },
          { label: '37', value: '37' },
          { label: '38', value: '38' },
          { label: '39', value: '39' },
          { label: '40', value: '40' },
          { label: '41', value: '41' },
          { label: '42', value: '42' },
          { label: '43', value: '43' },
          { label: '44', value: '44' },
          { label: '45', value: '45' },
          { label: '46', value: '46' },
          { label: '47', value: '47' },
          { label: '48', value: '48' },
          { label: '49', value: '49' },
          { label: '50', value: '50' },
          { label: '51', value: '51' },
          { label: '52', value: '52' },
          { label: '53', value: '53' },
          { label: '54', value: '54' },
          { label: '55', value: '55' },
          { label: '56', value: '56' },
          { label: '57', value: '57' },
          { label: '58', value: '58' },
          { label: '59', value: '59' }
        ]}
        value={this.state.minute.value}
        containerStyle={{ ...styles.selectContainer, ...styles.oneThirdSelectContainer, ...{ marginLeft: format_number(10, 'px') } }}
        style={{ ...styles.select, ...styles.oneThirdSelect }}
        placeholder='mm'
      /> : <View style={[styles.phContainer, styles.phT]}>
        <Text style={styles.ph}>{moment(this.props.app.modal.data.walk.requested_time).format('mm')}</Text>
      </View>}
      {this.props.session.user.type === 2 ? <CustomSelect
        name='meridian'
        onChange={this._setMeridian}
        options={[
          { label: 'AM', value: 'am' },
          { label: 'PM', value: 'pm' }
        ]}
        value={this.state.meridian.value}
        containerStyle={{ ...styles.selectContainer, ...styles.oneThirdSelectContainer, ...{ marginLeft: format_number(10, 'px') } }}
        style={{ ...styles.select, ...styles.oneThirdSelect }}
        placeholder='am/pm'
      /> : <View style={[styles.phContainer, styles.phT]}>
        <Text style={styles.ph}>{moment(this.props.app.modal.data.walk.requested_time).format('a')}</Text>
      </View>}
    </View>
    {this.props.session.user.type === 2 ? <View style={styles.datePickerStatusesContainer}>
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginLeft: format_number(26, 'px'), marginRight: format_number(26, 'px') }} onPress={this._openDatePicker}>
        <Text style={{ borderBottomLeftRadius: format_number(4, 'px'), borderTopLeftRadius: format_number(4, 'px'), borderWidth: format_number(1, 'px'), borderStyle: 'solid', borderColor: '#DADADA', height: 36, width: 36, lineHeight: 34, textAlign: 'center' }}><Icon name='md-calendar' size={20} color='rgb(216, 216, 216)' /></Text>
        <Text style={styles.datePicker}>
          <Text style={styles.datePickerDate}>{moment(this.state.start).format('MM/DD/YY')}</Text>
        </Text>
      </TouchableOpacity>
    </View> : <View style={styles.phContainer}>
      <Text style={styles.inputIcon}><Icon name='md-calendar' size={20} color='#D8D8D8' /></Text>
      <Text style={styles.ph}>{moment(this.state.start).format('MM/DD/YY')}</Text>
    </View>}
    {this.props.session.user.type === 2 ? <View style={styles.datePickerStatusesContainer}>
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginLeft: format_number(26, 'px'), marginRight: format_number(26, 'px') }} onPress={this._openDatePicker}>
        <Text style={{ borderBottomLeftRadius: format_number(4, 'px'), borderTopLeftRadius: format_number(4, 'px'), borderWidth: format_number(1, 'px'), borderStyle: 'solid', borderColor: '#DADADA', height: 36, width: 36, lineHeight: 34, textAlign: 'center' }}><Icon name='md-calendar' size={20} color='rgb(216, 216, 216)' /></Text>
        <Text style={styles.datePicker}>
          <Text style={styles.datePickerDate}>{moment(this.state.end).format('MM/DD/YY')}</Text>
        </Text>
      </TouchableOpacity>
    </View> : <View style={styles.phContainer}>
      <Text style={styles.inputIcon}><Icon name='md-calendar' size={20} color='#D8D8D8' /></Text>
      <Text style={styles.ph}>{moment(this.state.end).format('MM/DD/YY')}</Text>
    </View>}
    <Text style={{ ...styles.summaryTitle, marginTop: format_number(20, 'px'), paddingLeft: format_number(26, 'px'), paddingRight: format_number(26, 'px') }}>Addons</Text>
    <CustomCheckBoxList async items={this.state.addons} endpoint='/addons' onValueChange={this._setAddons} style={styles.customCheckBoxList} />
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Summary</Text>
      <View style={styles.scanContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Icon style={{ ...styles.scanItem, ...styles.scanIcon }} name='ios-barcode-outline' />
          <Text style={styles.scanItem}>Scanned in</Text>
        </View>
        <Text style={styles.scanItem}>{moment(this.props.app.modal.data.walk.start).format('h:mmA M/d/YYYY')}</Text>
      </View>
      <View style={styles.scanContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Icon style={{ ...styles.scanItem, ...styles.scanIcon }} name='ios-barcode' />
          <Text style={styles.scanItem}>Scanned out</Text>
        </View>
        <Text style={styles.scanItem}>{moment(this.props.app.modal.data.walk.end).format('h:mmA M/d/YYYY')}</Text>
      </View>
      <Text style={{ ...styles.cost, marginTop: format_number(10, 'px') }}>{`Service Cost: ${0}`}</Text>
      <Text style={styles.cost}>{`Add-on Cost: ${0}`}</Text>
      <View style={{ height: format_number(1, 'px'), borderColor: '#979797', borderWidth: 1, marginBottom: format_number(5, 'px') }} />
      <Text style={styles.cost}>{`Total Cost: ${0}`}</Text>
    </View>
  </View></ScrollView>

  _tabTwo = () => <ScrollView style={{ height: Dimensions.get('window').height - 200 }}><View style={{ flex: 1 }}>
    <View style={{ marginTop: format_number(20, 'px') }}>
      <Text style={{ fontFamily: 'Roboto', color: '#666', fontSize: format_number(14, 'px'), marginBottom: format_number(10, 'px'), marginLeft: format_number(26, 'px'), marginRight: format_number(26, 'px') }}>Appointment Comments</Text>
      <Text style={{ color: 'rgb(153, 153, 153)', fontFamily: 'Roboto', fontSize: format_number(12, 'px'), marginBottom: format_number(20, 'px'), marginLeft: format_number(26, 'px'), marginRight: format_number(26, 'px') }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
      <Text style={{ fontFamily: 'Roboto', color: '#666', fontSize: format_number(14, 'px'), marginBottom: format_number(20, 'px'), marginLeft: format_number(26, 'px'), marginRight: format_number(26, 'px') }}>{this.props.app.modal.data.walk.pets[0].name}</Text>
      <Text style={{ fontFamily: 'Roboto', color: '#666', fontSize: format_number(13, 'px'), marginBottom: format_number(10, 'px'), marginLeft: format_number(26, 'px'), marginRight: format_number(26, 'px') }}>In-service Photos</Text>
      <ModalPhotoGallery {...this.props} photos={this.state.photos} />
      <GMaps {...this.props} walkPath={this.state.walkPath} />
    </View>
  </View></ScrollView>

  render () {
    return <View style={{ padding: 15, height: Dimensions.get('window').height, width: Dimensions.get('window').width, backgroundColor: '#00000030' }}>
      {/* <TimePickerModal selectedDays={this.state.selectedDays} selectDay={this._selectDay} isOpen={this.state.datePickerIsOpen} close={this._closeDatePicker} /> */}
      <View style={{ backgroundColor: 'white', height: Dimensions.get('window').height - 151 }}>{this.props.app.modal.data.walk ? this._modalContent() : <Text>No data available</Text>}</View>
      <View style={{ width: Dimensions.get('window').width - 30, flexDirection: 'row' }}>
        {!isWeb && <CustomButton title='ScanIn' style={{ backgroundColor: '#3DA647' }} clickable={() => { appController.openQrScanner() }} />}
      </View>
    </View>
  }
}

const tabStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    backgroundColor: '#1875F0'
  },
  tabBar: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  label: {
    color: '#3e3e3e',
    fontSize: format_number(12, 'px'),
    paddingLeft: format_number(20, 'px'),
    paddingRight: format_number(20, 'px'),
    paddingTop: format_number(14, 'px'),
    paddingBottom: format_number(14, 'px'),
    fontFamily: 'Roboto'
  },
  labelSelected: {
    color: '#1875F0',
    fontSize: format_number(12, 'px'),
    paddingLeft: format_number(20, 'px'),
    paddingRight: format_number(20, 'px'),
    paddingTop: format_number(14, 'px'),
    paddingBottom: format_number(14, 'px'),
    fontFamily: 'Roboto'
  }
})

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderWidth: format_number(1, 'px'),
    borderStyle: 'solid',
    borderColor: '#ccc',
    backgroundColor: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 4,
    outline: 'none',
    padding: 0,
    minWidth: 0,
    minHeight: 0
  },
  cost: {
    fontFamily: 'Roboto',
    fontSize: format_number(14, 'px'),
    color: '#666666',
    textAlign: 'right',
    paddingBottom: format_number(5, 'px')
  },
  close: {
    color: '#000'
  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 5000,
    paddingTop: format_number(10, 'px'),
    paddingBottom: format_number(10, 'px'),
    paddingLeft: format_number(20, 'px'),
    paddingRight: format_number(20, 'px')
  },
  customCheckBoxList: {
    marginLeft: format_number(26, 'px'),
    marginRight: format_number(26, 'px'),
    marginTop: format_number(10, 'px')
  },
  datePickerStatusesContainer: {
    marginTop: format_number(10, 'px'),
    // paddingBottom: format_number(10, 'px'),
    flexDirection: 'row',
    flex: 1
  },
  datePicker: {
    // height: format_number(40, 'px'),
    // width: format_number(114, 'px'),
    borderWidth: format_number(1, 'px'),
    borderStyle: 'solid',
    borderColor: '#DADADA',
    borderTopRightRadius: format_number(4, 'px'),
    borderBottomRightRadius: format_number(4, 'px'),
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 0,
    flexDirection: 'row',
    padding: 0,
    lineHeight: 33,
    flex: 1,
    textAlign: 'left'
  },
  datePickerDate: {
    flex: 1,
    color: '#999999',
    fontSize: format_number(14, 'px'),
    fontFamily: 'Roboto',
    paddingLeft: format_number(10, 'px')
  },
  header: {
    backgroundColor: '#F4F4F4',
    paddingTop: format_number(22, 'px'),
    paddingRight: format_number(26, 'px'),
    paddingBottom: format_number(19, 'px'),
    paddingLeft: format_number(26, 'px')
  },
  headerTitle: {
    color: '#3E3E3E',
    fontSize: format_number(16, 'px'),
    // fontWeight: format_number(16, 'px'),
    fontFamily: 'Roboto',
    marginLeft: format_number(29, 'px')
  },
  inputIcon: {
    height: 36,
    width: 36,
    lineHeight: 34,
    textAlign: 'center',
    marginLeft: format_number(-10, 'px')
  },
  phContainer: {
    marginLeft: 26,
    marginRight: 26,
    flexDirection: 'row'
  },
  ph: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: 'rgb(153, 153, 153)',
    height: 36,
    lineHeight: 36
  },
  phT: {
    marginLeft: 0,
    marginRight: 0
  },
  select: {
    borderWidth: format_number(1, 'px'),
    borderStyle: 'solid',
    borderColor: '#DADADA',
    borderRadius: format_number(4, 'px'),
    fontSize: format_number(14, 'px'),
    fontFamily: 'Roboto',
    color: '#999999'
  },
  selectContainer: {
    marginLeft: format_number(26, 'px'),
    marginRight: format_number(26, 'px'),
    marginTop: format_number(10, 'px'),
    flexDirection: 'row'
  },
  summaryContainer: {
    backgroundColor: '#F4F4F4',
    paddingLeft: format_number(26, 'px'),
    paddingRight: format_number(26, 'px'),
    paddingTop: format_number(15, 'px'),
    flexDirection: 'column',
    paddingBottom: format_number(10, 'px'),
    marginTop: format_number(15, 'px')
  },
  summaryTitle: {
    color: '#666666',
    fontSize: format_number(14, 'px'),
    fontFamily: 'Roboto',
    paddingTop: format_number(10, 'px'),
    paddingBottom: format_number(10, 'px')
  },
  scanContainer: {
    paddingTop: format_number(0, 'px'),
    paddingBottom: format_number(10, 'px'),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  scanItem: {
    fontFamily: 'Roboto',
    fontSize: format_number(14, 'px'),
    color: '#808080'
  },
  scanIcon: {
    paddingRight: format_number(10, 'px')
  },
  tabContainer: {
    flex: 1
  },
  tabPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  oneThirdSelectContainer: {
    marginLeft: format_number(0, 'px'),
    marginRight: format_number(0, 'px'),
    marginTop: format_number(10, 'px'),
    flex: 1
  },
  oneThirdSelect: {
    borderWidth: format_number(1, 'px'),
    borderStyle: 'solid',
    borderColor: '#DADADA',
    borderRadius: format_number(4, 'px'),
    fontSize: format_number(14, 'px'),
    fontFamily: 'Roboto'
  }
}

const mapStateToProps = state => {
  return {
    app: state.app,
    session: state.session
  }
}

export default connect(mapStateToProps)(WalkModal)
