/* globals after */

const browser = require('../browser')
const chalk = require('chalk')
const context = require('../context')
const env = require('../env')

if (env.E2E_VERBOSE) {
  console.log(chalk.blue('NOTE: Make sure petcheck-web is running!'))
}

describe('e2e:mobile', function () {
  context.setChain('e2e:mobile')

  after(function () {
    if (context.getChain() === 'e2e:mobile') {
      browser.quit()
    }
  })

  require('./licensee')
})
