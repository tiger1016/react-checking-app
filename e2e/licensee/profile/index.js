/* globals after */

const browser = require('../../browser')
const context = require('../../context')

describe('Profile', function () {
  if (
    context.getChain() !== 'e2e' ||
    context.getChain() !== 'licensee'
  ) {
    context.setChain('profile')
  }

  after(function () {
    if (context.getChain() === 'profile') {
      browser.quit()
    }
  })

  require('./loads')
  require('./bankInformation')
  require('./passwords')
  require('./profileInformation')
  require('./qrCodes')
})
