/* globals after, before */

const browser = require('../../../browser')
const { By } = require('selenium-webdriver')
const context = require('../../../context')
const env = require('../../../env')

// Helpers
const waitForClearedInput = require('../../../helpers/waitForClearedInput')
const waitForElementFound = require('../../../helpers/waitForElementFound')
const waitForLoggedIn = require('../../../helpers/waitForLoggedIn')

describe('Passwords', function () {
  if (
    context.getChain() !== 'e2e' ||
    context.getChain() !== 'licensee' ||
    context.getChain() !== 'profile'
  ) {
    context.setChain('profile-passwords')
  }

  const msWait = env.E2E_TIMEOUT_SECONDS * 1000
  this.timeout(msWait)

  before(async function () {
    await waitForLoggedIn(browser)
    await browser.navigate().to(env.BASE + '/profile/passwords')
  })

  after(function () {
    if (context.getChain() === 'profile-passwords') {
      browser.quit()
    }
  })

  const buttonS = 'div.button-container button' // save button
  const passwordInputS = '.DoubleInputAndAction input[name=password]'
  const passwordConfirmInputS = '.DoubleInputAndAction input[name=password_confirmation]'
  const globalPasswordS = 'input[name="global_password"]'
  const globalPasswordConfirmS = 'input[name="global_password_confirmation"]'

  it('sends error on mismatched passwords', async function () {
    await waitForElementFound(browser, buttonS, msWait)

    let el = await browser.findElement(By.css(passwordInputS))
    await waitForClearedInput(el)
    await el.sendKeys('password')

    el = await browser.findElement(By.css(passwordConfirmInputS))
    await waitForClearedInput(el)
    await el.sendKeys('pasword123465')

    el = await browser.findElement(By.css(buttonS))
    await el.click()

    await browser.findElement(By.css('.DoubleInputAndAction div.input-container:nth-child(2) div.TextInput.error'))
  })

  it('sends error on mismatched global password', async function () {
    await waitForElementFound(browser, buttonS, msWait)

    let el = await browser.findElement(By.css(globalPasswordS))
    await waitForClearedInput(el)
    await el.sendKeys('password')

    el = await browser.findElement(By.css(globalPasswordConfirmS))
    await waitForClearedInput(el)
    await el.sendKeys('pasword123465')

    el = await browser.findElement(By.css(buttonS))
    await el.click()

    await browser.findElement(By.css('.DoubleInputAndAction:last-child div.input-container:nth-child(2) div.TextInput.error'))
  })
})
