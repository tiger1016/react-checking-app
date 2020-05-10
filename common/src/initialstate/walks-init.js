// Base init
import baseInit from './base-init'

export default {
  ...baseInit,
  end_time: null,
  frequencies: [
    { name: 'Recurring Weekly', id: 'weekly' },
    { name: 'Recurring Bi-Weekly', id: 'biweekly' },
    { name: 'Recurring Monthly', id: 'monthly' },
    { name: 'One Time', id: 'once' }
  ],
  progress: null,
  progressTotal: null,
  start_time: null,
  updating: false,
  walks: []
}
