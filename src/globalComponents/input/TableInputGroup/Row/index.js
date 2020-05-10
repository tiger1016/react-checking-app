// Libraries
import React from 'react'

// Components
import Column from '../Column'

export default class Row extends React.Component {
  shouldComponentUpdate (nextProps) {
    let { forceUpdate, optimizeWithWasChanged, rowChanged } = nextProps
    if (!forceUpdate && optimizeWithWasChanged) {
      return rowChanged
    }
    return true
  }
  render () {
    let {
      columns,
      columnsChanged,
      forceUpdate,
      optimizeWithWasChanged,
      reduxForm
    } = this.props

    let changeAll = columnsChanged.filter(c => c.column === -1).length

    return <tr className={`Row`}>
      {columns.map((c, i) => <Column
        columnChanged={changeAll ? true : (columnsChanged.filter(c => c.column === i).length || null)}
        forceUpdate={forceUpdate}
        index={i}
        key={i}
        field={c}
        optimizeWithWasChanged={optimizeWithWasChanged}
        reduxForm={reduxForm}
      />)}
    </tr>
  }
}
