// Libraries
import React from 'react'
import classNames from 'classnames'

// Styles
import './index.css'

// Components
import HeaderRow from './HeaderRow'
import Row from './Row'

export default class TableInputGroup extends React.Component {
  state = {
    forceUpdate: true
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.reduxForm || nextProps.reduxForm) {
      let prevColumns = this.props.rows.filter(r => r.columns.filter(c => c.type).length).length
      let nextColumns = nextProps.rows.filter(r => r.columns.filter(c => c.type).length).length

      if (!prevColumns && nextColumns) {
        this.setState({ forceUpdate: true })
      } else {
        this.setState({ forceUpdate: false })
      }
    }
  }
  resolveContainerClassNames = () => {
    let {
      notStripped,
      pushedLeft
    } = this.props

    return classNames({
      'TableInputGroup': true,
      'pushed-left': pushedLeft,
      'stripped': !notStripped
    })
  }

  render () {
    let {
      changed,
      headerRow,
      optimizeWithWasChanged,
      reduxForm,
      rows
    } = this.props

    if (!optimizeWithWasChanged) {
      changed = []
    }

    return <table className={this.resolveContainerClassNames()} cellSpacing='0' cellPadding='0'>
      <thead>
        <HeaderRow columns={headerRow} optimizeWithWasChanged={optimizeWithWasChanged} reduxForm={reduxForm} />
      </thead>
      <tbody>
        {rows.map((r, i) => <Row
          columns={r.columns}
          columnsChanged={changed.filter(c => c.row === i)}
          forceUpdate={this.state.forceUpdate}
          key={i}
          optimizeWithWasChanged={optimizeWithWasChanged}
          reduxForm={reduxForm}
          rowChanged={changed.filter(c => c.row === i).length}
        />)}
      </tbody>
    </table>
  }
}
