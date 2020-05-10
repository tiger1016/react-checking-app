/* globals after */

const browser = require('../../../browser')
const context = require('../../../context')

describe('Dashboard', function () {
  if (
    context.getChain() !== 'e2e:mobile' ||
    context.getChain() !== 'licensee'
  ) {
    context.setChain('dashboard')
  }

  after(async function () {
    if (context.getChain() === 'dashboard') {
      await browser.quit()
    }
  })

  require('./loads')
})
