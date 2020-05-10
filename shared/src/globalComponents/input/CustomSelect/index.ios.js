import React, { Component } from 'react'
import { View } from 'react-native'
import SelectModal from './component/SelectModal'

export default class CustomSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedItems: props.value ? props.value : [],
      items: props.options
    }
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems })
    if (this.props.onChange) this.props.onChange(selectedItems)
  };

  deleteItem = selectedItem => {
    const _selectedItems = [...this.state.selectedItems]
    const _index = _selectedItems.indexOf(selectedItem)
    _selectedItems.splice(_index, 1)
    this.setState({ selectedItems: _selectedItems })
    if (this.props.onChange) this.props.onChange(_selectedItems)
  }

  render () {
    let options = this.state.items
    if (this.props.multi) {
      options = options.filter(item => !this.state.selectedItems.find(innerItem => innerItem.value === item.value))
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 5 }}>
        <SelectModal
          title='Checkbox'
          ref='select'
          onConfirm={this.onSelectedItemsChange}
        >
          {this.props.multi && this.state.selectedItems.map((item, index) =>
            <SelectModal.Label
              key={'label-' + index}
              data={item}
              multi={this.props.multi}
              onCancel={() => { this.deleteItem(item) }}
            >{item.label}</SelectModal.Label>
          )}
          {options.map((item, index) =>
            <SelectModal.ModalItem
              key={'modal-item-' + index}
              data={item}
            >{item.label}</SelectModal.ModalItem>
          )}
        </SelectModal>
      </View>
    )
  }
}
