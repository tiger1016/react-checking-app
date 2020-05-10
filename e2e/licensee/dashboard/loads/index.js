/* globals after, before */

const browser = require('../../../browser')
const context = require('../../../context')
const env = require('../../../env')

// Helpers
const makeWaitForElementFound = require('../../../helpers/makeWaitForElementFound')
const waitForLoggedIn = require('../../../helpers/waitForLoggedIn')

describe('Load test', function () {
  if (
    context.getChain() !== 'e2e' ||
    context.getChain() !== 'licensee' ||
    context.getChain() !== 'dashboard'
  ) {
    context.setChain('dashboard-loads')
  }

  const msWait = env.E2E_TIMEOUT_SECONDS * 1000
  this.timeout(msWait)

  before(async function () {
    await waitForLoggedIn(browser)
  })
  after(async function () {
    if (context.getChain() === 'dashboard-loads') {
      await browser.quit()
    }
  })

  describe('Daily Snapshot', function () {
    const dashboardCardS = '.daily-snapshot-container'
    const chartS = '.pie-chart'
    const testTarget = `${dashboardCardS} ${chartS}:last-child .data-color`
    it('loads', makeWaitForElementFound(browser, testTarget, msWait))
  })

  describe('Busy Hours Today', function () {
    const dashboardCardS = '.busy-hours-container'
    const chartS = '.barchart-container'
    const testTarget = `${dashboardCardS} ${chartS}:last-child .data-color`
    it('loads', makeWaitForElementFound(browser, testTarget, msWait))
  })

  describe('Revenue', function () {
    const dashboardCardS = '.revenue-container'
    const chartS = '.line-chart-container'
    const testTarget = `${dashboardCardS} ${chartS}:last-child .data-color`
    it('loads', makeWaitForElementFound(browser, testTarget, msWait))
  })

  describe('Customer Base', function () {
    const dashboardCardS = '.CustomerBase'
    const chartS = '.customer-base-container'
    const testTarget = `${dashboardCardS} ${chartS}:last-child .legend-row`
    it('loads', makeWaitForElementFound(browser, testTarget, msWait))
  })

  describe('Business Snapshot', function () {
    const dashboardCardS = '.business-snapshot-container'
    const chartS = '.pie-chart'
    const testTarget = `${dashboardCardS} ${chartS}:last-child .DashboardButton > button`
    it('loads', makeWaitForElementFound(browser, testTarget, msWait))
  })

  describe('Top Zip Codes', function () {
    const dashboardCardS = '.TopZips'
    const chartS = '.top-zips-sidebar'
    const testTarget = `${dashboardCardS} ${chartS}:last-child .zip-amount`
    it('loads', makeWaitForElementFound(browser, testTarget, msWait))
  })
})
