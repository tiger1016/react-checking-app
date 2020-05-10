/* globals after, before */

let browser = require('../../../browser')
const { By } = require('selenium-webdriver')
const context = require('../../../context')
const env = require('../../../env')

// Helpers
const waitForAssignedSelect = require('../../../helpers/waitForAssignedSelect')
const waitForClearedInput = require('../../../helpers/waitForClearedInput')
const waitForElementFound = require('../../../helpers/waitForElementFound')
const waitForInputValue = require('../../../helpers/waitForInputValue')
const waitForLoggedIn = require('../../../helpers/waitForLoggedIn')
// const waitForPopulatedForm = require('../../../helpers/waitForPopulatedForm')
const waitForSuccessElement = require('../../../helpers/waitForSuccessElement')

describe('Bank Information', function () {
  if (
    context.getChain() !== 'e2e' ||
    context.getChain() !== 'licensee' ||
    context.getChain() !== 'profile'
  ) {
    context.setChain('profile-bankInformation')
  }

  const msWait = env.E2E_TIMEOUT_SECONDS * 1000
  this.timeout(msWait)

  const containerS = '#BankInformation'
  const bankAccountInputS = `${containerS} input[name=bank_account_number]`
  const bankAccountInputErrorS = `${containerS} div.error.t-containerbank_account_number`
  const bankRoutingNumberS = `${containerS} input[name=bank_routing_number]`
  const bankRoutingNumberInputErrorS = `${containerS} div.error.t-containerbank_routing_number`
  const birthDateInputS = `${containerS} input[name=birth_year]`
  const birthDateInputErrorS = `${containerS} div.error.t-containerbirth_year`
  const buttonS = `${containerS} > .ButtonGroup button` // Both edit and save button
  const daysOfMonthSelectS = `${containerS} .DaysOfMonthSelect .Select`
  const feinNumberS = `${containerS} input[name=fein_number]`
  const monthsSelectS = `${containerS} .MonthsSelect .Select`
  const socialNumberS = `${containerS} input[name=social_number]`

  before(async function () {
    await waitForLoggedIn(browser)
    await browser.navigate().to(env.BASE + '/profile/bank-information')
  })

  after(function () {
    if (context.getChain() === 'profile-bankInformation') {
      browser.quit()
    }
  })

  async function formReady (b, el, msWait) {
    try {
      await waitForElementFound(browser, containerS, msWait)

      await waitForElementFound(browser, buttonS, msWait)
      await browser.findElement(By.css(buttonS)).click()

      await waitForElementFound(browser, bankAccountInputS, msWait)
    } catch (error) {
      throw error
    }
  }

  it('updates', async function () {
    try {
      await formReady(browser, bankAccountInputS, msWait)

      // waitForPopulatedForm doesn't work here for some reason
      let el = await browser.findElement(By.css(bankAccountInputS))
      await waitForInputValue(browser, el, msWait)

      el = await browser.findElement(By.css(bankAccountInputS))
      await waitForClearedInput(el)
      await el.sendKeys('9999999999')

      el = await browser.findElement(By.css(bankRoutingNumberS))
      await waitForClearedInput(el)
      await el.sendKeys('071101307')

      el = await browser.findElement(By.css(feinNumberS))
      await waitForClearedInput(el)
      await el.sendKeys('888888888')

      el = await browser.findElement(By.css(socialNumberS))
      await waitForClearedInput(el)
      await el.sendKeys('123123123')

      el = await browser.findElement(By.css(birthDateInputS))
      await waitForClearedInput(el)
      await el.sendKeys('1984')

      await waitForAssignedSelect(browser, monthsSelectS, 4, msWait)
      await waitForAssignedSelect(browser, daysOfMonthSelectS, 5, msWait)

      const button = await browser.findElement(By.css(buttonS))
      await button.click()

      await waitForSuccessElement(browser, msWait)
    } catch (error) {
      throw error
    }
  })

  it('shows error when malformed or blank account number entered', async function () {
    await formReady(browser, bankAccountInputS, msWait)

    // waitForPopulatedForm doesn't work here for some reason
    let el = await browser.findElement(By.css(bankAccountInputS))
    await waitForInputValue(browser, el, msWait)

    el = await browser.findElement(By.css(bankAccountInputS))
    await waitForClearedInput(el)
    await el.sendKeys('99999999992222222222222222')
    let button = await browser.findElement(By.css(buttonS))
    await button.click()
    await waitForElementFound(browser, bankAccountInputErrorS, msWait)

    el = await browser.findElement(By.css(bankAccountInputS))
    await waitForClearedInput(el)
    await el.sendKeys('')
    button = await browser.findElement(By.css(buttonS))
    await button.click()

    await waitForElementFound(browser, bankAccountInputErrorS, msWait)
  })

  it('shows error when malformed or blank routing number entered', async function () {
    await formReady(browser, bankRoutingNumberS, msWait)

    // waitForPopulatedForm doesn't work here for some reason
    let el = await browser.findElement(By.css(bankRoutingNumberS))
    await waitForInputValue(browser, el, msWait)

    el = await browser.findElement(By.css(bankRoutingNumberS))
    await waitForClearedInput(el)
    await el.sendKeys('12312312312123')
    let button = await browser.findElement(By.css(buttonS))
    await button.click()
    await waitForElementFound(browser, bankRoutingNumberInputErrorS, msWait)

    el = await browser.findElement(By.css(bankRoutingNumberS))
    await waitForClearedInput(el)
    await el.sendKeys('')
    button = await browser.findElement(By.css(buttonS))
    await button.click()

    await waitForElementFound(browser, bankRoutingNumberInputErrorS, msWait)
  })

  it('shows error when malformed or blank birth date entered', async function () {
    await formReady(browser, birthDateInputS, msWait)

    // waitForPopulatedForm doesn't work here for some reason
    let el = await browser.findElement(By.css(birthDateInputS))
    await waitForInputValue(browser, el, msWait)

    el = await browser.findElement(By.css(birthDateInputS))
    await waitForClearedInput(el)
    await el.sendKeys('0000')
    let button = await browser.findElement(By.css(buttonS))
    await button.click()
    await waitForElementFound(browser, birthDateInputErrorS, msWait)

    el = await browser.findElement(By.css(birthDateInputS))
    await waitForClearedInput(el)
    await el.sendKeys('')
    button = await browser.findElement(By.css(buttonS))
    await button.click()

    await waitForElementFound(browser, birthDateInputErrorS, msWait)
  })
})
