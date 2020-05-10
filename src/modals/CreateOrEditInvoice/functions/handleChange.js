export default that => (event, key, name) => {
  const invoiceList = that.state.invoiceList.map((term, index) => {
    if (Number(index) !== Number(key)) return term

    if (name === 'amount') return { ...term, edited: true, amount: event.target.value }
    if (name === 'billing_group_description') return { ...term, edited: true, billing_group_description: event.target.value }
    if (name === 'discount_amount') return { ...term, edited: true, discount_amount: event.target.value }
    if (name === 'discount_type') return { ...term, edited: true, discount_type: event.value }
    if (name === 'quantity') return { ...term, edited: true, quantity: event.target.value }
    if (name === 'requested_time') return { ...term, edited: true, requested_time: event }
    return term
  })
  that.setState({ invoiceList }, () => that.updateTotals(that.state.invoiceList))
}
