export default that => (e, key) => {
  const invoiceList = that.state.invoiceList.slice()
  invoiceList.splice(key, 1)
  that.setState({ invoiceList }, () => that.updateTotals(that.state.invoiceList))
}
