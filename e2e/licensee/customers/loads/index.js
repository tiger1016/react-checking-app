const browser = require('../../../browser')
const env = require('../../../env')

// Helpers
const makeLoadTest = require('../../../helpers/makeLoadTest')
const makeWaitForElementFound = require('../../../helpers/makeWaitForElementFound')

describe('Load test', makeLoadTest(
  browser,
  'licensee',
  'customers',
  (env.BASE + '/customers'),
  function (msWait) {
    return describe('Customers Table', function () {
      const tableS = '#Customers .CustomTable'
      const headerRowS = '.rt-thead .rt-tr'
      const testTarget = `${tableS} ${headerRowS} .rt-th`
      it('loads', makeWaitForElementFound(browser, testTarget, msWait))
    })
  }))
