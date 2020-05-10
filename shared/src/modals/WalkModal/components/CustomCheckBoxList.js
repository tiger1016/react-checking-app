// Libraries
import React from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import _ from 'lodash'
import { Checkbox } from 'nachos-ui'
import Fuse from 'fuse.js'

// Utils
import { logger } from '../../../../utils'
import format_number from '../../../../utils/format_number' // eslint-disable-line camelcase

export default class CustomCheckBoxList extends React.Component {
  constructor () {
    super()
    this.state = {
      cachedItems: null,
      errorMessage: null,
      loading: true,
      items: []
    }
  }

  componentDidMount () {
    if (this.props.async) {
      this._fetchItems()
    }
  }

  _fetchItems = () => {
    // api.axios.get(this.props.endpoint, {
    //   params: { jwt: api.jwt() }
    // }).then((response) => {
    //   if (response && response.data && response.data.data) {
    //     logger.log('CustomCheckBoxList XHR Response', response)
    //     this.setState({loading: false, items: response.data.data, cachedItems: response.data.data})
    //   }
    //   logger.log('CustomCheckBoxList Empty Response', response)
    //   this.setState({loading: false, errorMessage: 'No data available'})
    // }).catch((error) => {
    //   logger.log('CustomCheckBoxList XHR Error', error)
    //   this.setState({loading: false, errorMessage: error})
    // })
  }

  _isChecked = item => {
    var ids = this.props.items.map(i => i.id)
    return _.includes(ids, item.id)
  }

  _searchAddons = value => {
    if (value && value !== '') {
      var options = {
        threshold: 0,
        keys: [
          'name'
        ]
      }
      var addons = this.state.items.slice()
      this.fuse = new Fuse(addons, options)
      const items = this.fuse.search(value)
      this.setState({ items })
    } else {
      const items = this.state.cachedItems.slice()
      this.setState({ items })
    }
  }

  render () {
    logger.rlog('<CustomCheckBoxList />', this)
    return <View style={[styles.style, this.props.style]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search addons'
          value={this.state.searchValue}
          onChangeText={value => this._searchAddons(value)}
        />
      </View>
      {this.state.items.map(item => {
        return <View style={[styles.containerStyle, this.props.containerStyle]} key={'Addon:' + item.id}>
          <Checkbox
            style={[styles.checkboxStyle, this.props.checkboxStyle]}
            checked={this._isChecked(item)}
            onValueChange={() => this.props.onValueChange(item)}
          />
          <Text style={[styles.textStyle, this.props.textStyle]}>{item.name}</Text>
        </View>
      })}
    </View>
  }
}

const styles = StyleSheet.create({
  style: {
    flexDirection: 'column'
  },
  containerStyle: {
    flexDirection: 'row',
    marginBottom: format_number(15, 'px')
  },
  checkboxStyle: {
    width: format_number(20, 'px'),
    height: format_number(20, 'px')
  },
  input: {
    borderWidth: format_number(1, 'px'),
    borderColor: '#DADADA',
    borderStyle: 'solid',
    borderRadius: format_number(4, 'px'),
    backgroundColor: '#FFFFFF',
    fontSize: format_number(12, 'px'),
    fontWeight: '500',
    color: '#999999',
    fontFamily: 'Roboto',
    flex: 1,
    paddingTop: format_number(13, 'px'),
    paddingBottom: format_number(13, 'px'),
    paddingLeft: format_number(15, 'px')
  },
  inputContainer: {
    paddingBottom: format_number(5, 'px'),
    marginBottom: format_number(15, 'px')
  },
  textStyle: {
    color: '#808080',
    fontSize: format_number(14, 'px'),
    marginLeft: format_number(10, 'px'),
    lineHeight: format_number(20, 'px')
  }
})
