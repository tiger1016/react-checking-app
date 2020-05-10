export default that => invoiceList => {
  if (!invoiceList && !invoiceList.length) {
    return 0
  }

  const { salesTaxPercentage } = that.props

  let discountAmount = 0
  let salesTax = 0
  let subTotal = 0
  let total = 0

  subTotal = invoiceList.reduce((subTotal, { amount, quantity = 1 }) =>
    parseFloat(subTotal || 0) + (parseFloat(amount || 0) * (quantity || 1))
  , 0)

  discountAmount = invoiceList.reduce((discountAmount = 0, it) => {
    if (it.discount_amount && it.discount_amount !== 0) {
      let dA = parseFloat(it.discount_amount)
      if (it.discount_type === 'percent') return discountAmount + ((dA / 100) * parseFloat(it.amount))
      else if (it.discount_type === 'dollar') return discountAmount + dA
    }
    return discountAmount
  }, 0)

  total = subTotal - discountAmount

  if (salesTaxPercentage) salesTax = (total * salesTaxPercentage) / 100

  total = total + salesTax
  that.setState({
    invoiceList,
    discountAmount,
    salesTax,
    subTotal,
    total
  })
}
