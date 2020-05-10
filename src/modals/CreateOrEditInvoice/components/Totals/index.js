// Libraries
import React from 'react'
import NumberFormat from 'react-number-format'

export default ({
  discountAmount,
  salesTax,
  salesTaxPercentage,
  subTotal,
  total
}) => <div className='invoice-heading-adding'>
  <div className='box round'>
    <div className='item'>
      <span className='box-label'>SUBTOTAL: </span>
      <NumberFormat
        decimalScale={2}
        displayType={'text'}
        fixedDecimalScale
        prefix={'$'}
        thousandSeparator
        value={subTotal || 0}
      />
    </div>
    <br />
    <div className='item' style={{ paddingTop: '10px' }}>
      <span className='box-label'>DISCOUNT: </span>
      <NumberFormat
        decimalScale={2}
        displayType={'text'}
        fixedDecimalScale
        prefix={'$'}
        thousandSeparator
        value={discountAmount || 0}
      />
    </div>
    <div className='item' style={{ paddingTop: '10px' }}>
      <span className='box-label'>SALES TAX({salesTaxPercentage}%): </span>
      <NumberFormat
        decimalScale={2}
        displayType={'text'}
        fixedDecimalScale
        prefix={'$'}
        thousandSeparator
        value={salesTax || 0}
      />
    </div>
    <div className='lining' />
    <div className='item' style={{ paddingTop: '5px' }}>
      <span className='box-label'>TOTAL DUE: </span>
      <NumberFormat
        decimalScale={2}
        displayType={'text'}
        fixedDecimalScale
        prefix={'$'}
        thousandSeparator
        value={total || 0}
      />
    </div>
  </div>
</div>
