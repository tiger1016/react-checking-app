// Libraries
import React from 'react'

// Components
import Column from '../Column'

export default class TableHeader extends React.Component {
  shouldComponentUpdate (nextProps) {
    if (nextProps.optimizeWithWasChanged) {
      return false
    }
    return true
  }
  render () {
    let {
      columns,
      reduxForm
    } = this.props

    return <tr className={`HeaderRow`}>
      {columns.map((c, i) => <Column key={i} field={c} head reduxForm={reduxForm} />)}
    </tr>
  }
}
