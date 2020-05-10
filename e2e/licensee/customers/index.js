/* globals after */

const browser = require('../../browser')
const context = require('../../context')

describe('Customers', function () {
  if (
    context.getChain() !== 'e2e' ||
    context.getChain() !== 'licensee'
  ) {
    context.setChain('customers')
  }

  after(function () {
    if (context.getChain() === 'customers') {
      browser.quit()
    }
  })

  require('./loads')
})
