
import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ViewPropTypes,
  ListView
} from 'react-native'

import Cell from './Components/Cell'
import Header from './Components/Header'
import HeaderCell from './Components/HeaderCell'
import Row from './Components/Row'
import Loader from '../Loader'
export default class CustomTable extends React.Component {
  shouldComponentUpdate = (props) => {
    return this.props.data !== props.data
  }

  renderHeader = () => {
    const headerCells = []
    if (this.props.columns && this.props.columns.length > 0) {
      this.props.columns.forEach((column, i) => {
        headerCells.push(
          <HeaderCell
            key={i}
            style={dataTableStyles.headerCell}
            textStyle={dataTableStyles.text}
            width={column.width}
            text={column.label}
          />
        )
      })
    }
    return (
      <Header style={dataTableStyles.header}>
        {headerCells}
      </Header>
    )
  }

  renderRow = (item, sectionId, RowId) => {
    const cells = []
    if (this.props.columns && this.props.columns.length > 0) {
      this.props.columns.forEach((column, i) => {
        let itemString = ''
        if ((typeof column.accessor === 'string') || (typeof column.accessor === 'number')) {
          itemString = item[column.accessor]
        } else if (typeof column.accessor === 'function') {
          itemString = column.accessor(item)
        }
        cells.push(
          <Cell
            key={i}
            style={dataTableStyles.cell}
            textStyle={dataTableStyles.text}
            width={column.width}
          >
            {column.Cell ? column.cell(item) : itemString}
          </Cell>
        )
      })
    }
    return (
      <Row onPress={() => this.props.onRowClick(item)} style={RowId % 2 === 0 ? dataTableStyles.rowGray : dataTableStyles.row}>
        {cells}
      </Row>
    )
  }

  render () {
    const {
      style,
      listViewStyle,
      data,
      refCallback,
      loading
    } = this.props
    if (loading) {
      return <View style={[defaultStyles.verticalContainer, style]}><Loader /></View>
    }
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    const _dataSource = ds.cloneWithRows(data)
    if (data && data.length > 0) {
      return (
        <View style={[defaultStyles.verticalContainer, style]}>
          {this.renderHeader()}
          <ListView
            ref={refCallback}
            style={[defaultStyles.listview, listViewStyle]}
            dataSource={_dataSource}
            renderRow={this.renderRow}
          />
        </View>
      )
    } else {
      return null
    }
  }
}

CustomTable.propTypes = {
  style: ViewPropTypes.style,
  listViewStyle: PropTypes.number,
  refCallback: PropTypes.func,
  renderHeader: PropTypes.func,
  data: PropTypes.array.isRequired
}
CustomTable.defaultProps = {
  showsVerticalScrollIndicator: true,
  scrollRenderAheadDistance: 5000
}

const defaultStyles = StyleSheet.create({
  verticalContainer: {
    flex: 1
  },
  listView: {
    flex: 1
  }
})

const dataTableStyles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#999',
    textAlign: 'center'
  },
  header: {
    backgroundColor: 'white'
  },
  headerCell: {
    height: 40,
    borderRightWidth: 0.2,
    borderBottomWidth: 0.2,
    backgroundColor: 'white',
    borderColor: '#F9F9F9'
  },
  row: {
    backgroundColor: 'white',
    minHeight: 40
  },
  rowGray: {
    backgroundColor: '#F9F9F9',
    minHeight: 40
  },
  cell: {
    borderRightWidth: 0.2,
    borderColor: '#F9F9F9'
  },
  rightMostCell: {
    borderRightWidth: 0
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    margin: 5
  }
})
