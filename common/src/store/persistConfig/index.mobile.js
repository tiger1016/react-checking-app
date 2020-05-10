// Libraries
import { AsyncStorage } from 'react-native'

// Transforms
import transforms from './transforms'

export default {
  key: 'petcheck-storage',
  storage: AsyncStorage,
  blacklist: ['app', 'invoices', 'payrolls', 'network', 'reports'],
  transforms
}
