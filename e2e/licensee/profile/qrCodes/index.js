/* globals after, before */

let browser = require('../../../browser')
const { By } = require('selenium-webdriver')
const context = require('../../../context')
const env = require('../../../env')

// Helpers
const waitForAssignedSelect = require('../../../helpers/waitForAssignedSelect')
const waitForClearedInput = require('../../../helpers/waitForClearedInput')
const waitForElementFound = require('../../../helpers/waitForElementFound')
const waitForLoggedIn = require('../../../helpers/waitForLoggedIn')
const waitForSuccessElement = require('../../../helpers/waitForSuccessElement')

describe('QR Codes', function () {
  if (
    context.getChain() !== 'e2e' ||
    context.getChain() !== 'licensee' ||
    context.getChain() !== 'profile'
  ) {
    context.setChain('profile-qrCodes')
  }

  const msWait = env.E2E_TIMEOUT_SECONDS * 1000
  this.timeout(msWait)

  before(async function () {
    await waitForLoggedIn(browser)
    await browser.navigate().to(env.BASE + '/profile/qr-codes')
  })

  after(function () {
    if (context.getChain() === 'profile-qrCodes') {
      browser.quit()
    }
  })

  const containerS = '#QrCodes'
  const numberSelectS = `${containerS} div.t-number-select`
  const orderButtonS = `${containerS} button.button`
  const stateSelectS = `${containerS} div.t-state-select`

  it('sends 2 qr codes', async function () {
    try {
      await waitForElementFound(browser, numberSelectS, msWait)

      let el = await browser.findElement(By.css('input[name="address_shipping"]'))
      await waitForClearedInput(el)
      await el.sendKeys('random address')

      el = await browser.findElement(By.css('input[name="address2_shipping"]'))
      await waitForClearedInput(el)
      await el.sendKeys('random address2')

      el = await browser.findElement(By.css('input[name="city_shipping"]'))
      await waitForClearedInput(el)
      await el.sendKeys('city')

      await waitForAssignedSelect(browser, stateSelectS, 3, msWait)

      el = await browser.findElement(By.css('input[name="zip_shipping"]'))
      await waitForClearedInput(el)
      await el.sendKeys('45612')

      await waitForAssignedSelect(browser, numberSelectS, 3, msWait)

      el = await browser.findElement(By.css(orderButtonS))
      await el.click()

      await waitForSuccessElement(browser, msWait)
    } catch (error) {
      throw error
    }
  })
})
