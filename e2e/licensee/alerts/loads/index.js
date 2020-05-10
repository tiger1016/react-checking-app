const browser = require('../../../browser')
const env = require('../../../env')

// Helpers
const makeLoadTest = require('../../../helpers/makeLoadTest')
const makeWaitForElementFound = require('../../../helpers/makeWaitForElementFound')

describe('Load test', makeLoadTest(
  browser,
  'licensee',
  'alerts',
  (env.BASE + '/alerts'),
  function (msWait) {
    return describe('Alerts Table', function () {
      const tableS = '#Alerts .TableInputGroup'
      const headerRowS = 'tr.HeaderRow'
      const testTarget = `${tableS} ${headerRowS} th.Column`
      it('loads', makeWaitForElementFound(browser, testTarget, msWait))
    })
  }))
