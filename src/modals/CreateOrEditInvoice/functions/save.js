import moment from 'moment'

export default that => () => {
  const { createInvoice, invoice, salesTaxPercentage, updateInvoice } = that.props
  const { comments, customerId, invoiceList, dueDate } = that.state

  const isEdit = invoice.id && true
  const addonsToBeBilled = []
  const manualServicesToBeBilled = []
  const servicesToBeBilled = invoiceList.filter(t => {
    if (t.isAddon) {
      addonsToBeBilled.push(t)
    } else if (t.manual || !t.walk_id) {
      manualServicesToBeBilled.push(t)
    } else {
      return true
    }
    return false
  })

  that.setState({ isTouched: true }, () => {
    if (customerId && that.state.invoice_terms) {
      const unbilledServices = servicesToBeBilled.filter(t => t.isUnbilledService).map(term => ({
        amount: parseFloat(term.amount).toFixed(2),
        billing_group_description: term.billing_group_description,
        billing_group_id: term.parent_id,
        discount_amount: parseFloat(term.discount_amount || 0).toFixed(2),
        discount_type: term.discount_type,
        parent_id: term.parent_id,
        quantity: term.quantity,
        requested_time: moment(term.requested_time).format('YYYY-MM-DD HH:mm:ss'),
        walk_id: term.walk_id,
        walker_id: term.walker_id
      }))

      const invoicedServices = servicesToBeBilled.filter(t => !t.isUnbilledService)
        .map(term => ({
          amount: parseFloat(term.amount).toFixed(2),
          billing_group_description: term.billing_group_description,
          billing_group_id: term.billing_price_group_id || term.parent_id,
          discount_amount: parseFloat(term.discount_amount || 0).toFixed(2),
          discount_type: term.discount_type,
          quantity: term.quantity,
          requested_time: moment(term.requested_time).format('YYYY-MM-DD HH:mm:ss'),
          walk_id: term.walk_id,
          walker_id: term.walker_id
        }))

      const manualServices = manualServicesToBeBilled.map(term => ({
        amount: parseFloat(term.amount).toFixed(2),
        description: term.billing_group_description,
        date: moment(term.requested_time).format('MM/DD/YYYY'),
        discount_amount: parseFloat(term.discount_amount || 0).toFixed(2),
        discount_type: term.discount_type,
        quantity: term.quantity
      }))

      addonsToBeBilled.forEach(entry => {
        const index = unbilledServices.findIndex(s => `${s.parent_id}` === `${entry.parent_id}`)
        if (index > -1) {
          const addon = {
            addon_description: entry.billing_group_description,
            amount: entry.amount,
            discount_amount: parseFloat(entry.discount_amount || 0).toFixed(2),
            discount_type: entry.discount_type,
            id: entry.id,
            quantity: entry.quantity
          }
          if (unbilledServices[index].addon) {
            unbilledServices[index].addon.push(addon)
          } else {
            unbilledServices[index].addon = [addon]
          }
        }
      })
      const invoiceData = {
        comments,
        due_date: moment(dueDate).format('YYYY-MM-DD HH:mm:ss'),
        // due_date: isEdit ? moment(startDate).format('MM/DD/YYYY') : dueDate,
        manually_entered_services: manualServices,
        sales_tax_percentage: salesTaxPercentage || 0,
        services: [...unbilledServices, ...invoicedServices],
        terms: that.state.invoice_terms,
        user_id: customerId
      }

      if (isEdit) {
        updateInvoice(invoice.id, invoiceData)
      } else {
        createInvoice(invoiceData)
      }

      that.closeModal()
    }
  })
}
