// Libraries
import React from 'react'
import NumberFormat from 'react-number-format'

export default class OutstandingComponent extends React.Component {
  render () {
    const { outstanding } = this.props
    return <div className={outstanding > 0 ? 'outstanding-container' : ''}>
      <NumberFormat
        value={outstanding}
        displayType={'text'}
        thousandSeparator
        prefix={'$'}
        fixedDecimalScale
        decimalScale={2}
      />
    </div>
  }
}
