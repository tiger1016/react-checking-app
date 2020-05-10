// Alerts
import fetchAddon from '../../actions/addons/fetchAddon'
import fetchAlerts from '../../actions/alerts/fetchAlerts'
import fetchBillingInformation from '../../actions/profile/fetchBillingInformation'
import fetchCustomers from '../../actions/customers/fetchCustomers'
import fetchInvoiceDetail from '../../actions/invoices/fetchInvoiceDetail'
import fetchPet from '../../actions/pets/fetchPet'
import fetchSchedulerSettings from '../../actions/profile/fetchSchedulerSettings'
import fetchService from '../../actions/services/fetchService'
import fetchWalkDetail from '../../actions/walks/fetchWalkDetail'
import fetchWalkers from '../../actions/walkers/fetchWalkers'

export default (reducer, id, dispatch) => {
  switch (reducer) {
    case 'addons':
      dispatch(fetchAddon(id))
      break
    case 'alerts':
      dispatch(fetchAlerts())
      break
    case 'customer':
      dispatch(fetchCustomers(null, id))
      break
    case 'invoice':
      dispatch(fetchInvoiceDetail(id))
      break
    case 'pet':
      dispatch(fetchPet(id))
      break
    case 'services':
      dispatch(fetchService(id))
      break
    case 'settings':
      dispatch(fetchSchedulerSettings())
      dispatch(fetchBillingInformation())
      break
    case 'walker':
      dispatch(fetchWalkers(id))
      break
    case 'walk':
      dispatch(fetchWalkDetail(id))
      break
  }
}
