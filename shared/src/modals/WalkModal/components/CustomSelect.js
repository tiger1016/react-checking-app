// Libraries
import React from 'react'
import Select from '../../../globalComponents/input/CustomSelect'
import { View, Text } from 'react-native'
import _ from 'lodash'

// Utils
import { api, logger } from '../../../../utils'
import { session_helper } from '../../../../helpers/session_helper' // eslint-disable-line camelcase

export default class CustomSelect extends React.Component {
  constructor () {
    super()
    this.state = {
      errorMessage: null,
      loading: false
    }
  }

  _loadOptions = () => {
    const jwt = session_helper.getSessionJwt()
    logger.slog(`(CustomSelect.js => ${this.props.endpoint}) Using jwt`, jwt)
    return api.axios.get(this.props.endpoint, {
      params: { jwt }
    }).then(response => {
      if (response && response.data && response.data.data) {
        logger.xlog('CustomSelect (Async) RESPONSE', response)
        let options = response.data.data
        if (this.props.matchColumn && this.props.matchValue) {
          options = _.filter(options, option => {
            return option[this.props.matchColumn] === this.props.matchValue
          })
        }
        logger.xlog('CustomSelect (Async) Processed pets data', options)
        this.setState({ loading: false })
        return this._formatOptions(options)
      }
      logger.xlog('CustomSelect (Async) INVALID response', response)
      this.setState({ loading: false, errorMessage: 'No data available' })
    }).catch(error => {
      logger.xlog('CustomSelect (Async) ERROR', error)
      this.setState({ loading: false, errorMessage: error })
    })
  }

  _formatOptions = options => {
    const op = options.map(option => {
      return {
        label: option[this.props.labelField],
        value: option[this.props.valueField]
      }
    })
    const opt = { options: op }
    this.props.loadInitialValue(op)
    return opt
  }

  render () {
    logger.rlog('<CustomSelect />', this)
    var styleWithIcon = this.props.icon ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {}
    if (this.props.async) {
      return <View style={this.props.containerStyle}>
        {this.props.icon ? <Text style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#DADADA',
          height: '36px',
          borderTopLeftRadius: '2px',
          borderBottomLeftRadius: '2px',
          width: '36px',
          lineHeight: '34px',
          textAlign: 'center',
          borderRight: 0
        }}>{this.props.icon}</Text> : null}
        <Select.Async
          multi={this.props.multi || false}
          clearable={false}
          isLoading={this.state.loading}
          loadOptions={this._loadOptions}
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          style={{ ...this.props.style, ...styleWithIcon }}
          placeholder={this.props.placeholder}
        /></View>
    }
    return <View style={this.props.containerStyle}>
      {this.props.icon ? <Text style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#DADADA',
        height: '36px',
        borderTopLeftRadius: '2px',
        borderBottomLeftRadius: '2px',
        width: '36px',
        lineHeight: '34px',
        textAlign: 'center',
        borderRight: 0
      }}>{this.props.icon}</Text> : null}
      <Select
        clearable={false}
        multi={this.props.multi || false}
        name={this.props.name}
        onChange={this.props.onChange}
        options={this.props.options}
        value={this.props.value}
        style={{ ...this.props.style, ...styleWithIcon }}
        placeholder={this.props.placeholder}
      />
    </View>
  }
}
