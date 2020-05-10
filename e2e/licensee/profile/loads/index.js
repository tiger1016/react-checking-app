const browser = require('../../../browser')
const env = require('../../../env')

// Helpers
const makeLoadTest = require('../../../helpers/makeLoadTest')
const makeWaitForElementFound = require('../../../helpers/makeWaitForElementFound')

describe('Load test', makeLoadTest(
  browser,
  'licensee',
  'profile',
  (env.BASE + '/profile/profile-information'),
  function (msWait) {
    return describe('Index', function () {
      const sectionS = '#Profile #ProfileInformation'
      const headerRowS = '.DataDisplay'
      const testTarget = `${sectionS} ${headerRowS} .DataDisplay-row:last-child`
      it('loads', makeWaitForElementFound(browser, testTarget, msWait))
    })
  }))
