export default that => () => {
  const invoiceList = that.state.invoiceList.slice()
  invoiceList.push({
    amount: '',
    billing_group_description: '',
    discount_type: 'dollar',
    discountAmount: 0,
    manual: true,
    requested_time: '',
    quantity: 1
  })

  that.setState({ invoiceList })
}
