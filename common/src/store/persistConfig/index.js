// Libraries
import storage from 'redux-persist/lib/storage'

// Transforms
import transforms from './transforms'

export default {
  key: 'petcheck-storage',
  storage,
  blacklist: ['app', 'invoices', 'payrolls', 'network', 'reports'],
  transforms
}
