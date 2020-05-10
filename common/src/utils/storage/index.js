/**
 * Storage handler
 * NOTE: STORAGE CLASS CANNOT BE IMPORTED IN REDUCERS!! (NOR CAN utils/index.js)
 */
class Storage {
  constructor () {
    // Detect platform
    this.platform = process && process.env && process.env.PLATFORM_ENV && process.env.PLATFORM_ENV === 'web' ? 'web' : 'native'

    // Use platform's session store
    const SessionStore = this.platform === 'web' ? require('./web/SessionStore').default : null
    this.sessionStore = new SessionStore()
  }
}
export const storage = new Storage()
