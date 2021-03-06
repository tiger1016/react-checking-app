/* globals after */

const browser = require('../../browser')
const context = require('../../context')

describe('Licensee', function () {
  if (context.getChain() !== 'e2e:mobile') {
    context.setChain('licensee')
  }

  after(function () {
    if (context.getChain() === 'licensee') {
      browser.quit()
    }
  })

  require('./dashboard')
})
