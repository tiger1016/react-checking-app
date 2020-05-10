/* globals after */
/*
Run this with yarn e2e:doctor to
check if testing suite is setup
correctly
*/

const assert = require('assert')
const browser = require('./browser')
const chalk = require('chalk')
const env = require('./env')
const fs = require('fs')

describe('Doctor', function () {
  console.log(chalk.blue('NOTE: Make sure petcheck-web is running!'))

  describe('- Mocha and assert work', function () {
    it('indexOf() should return -1 when the value is not present', function () {
      assert.strictEqual([1, 2, 3].indexOf(4), -1)
    })
  })

  describe('- Selenium browser tests work', function () {
    this.timeout(env.E2E_TIMEOUT_SECONDS * 1000)
    it('test should match correct browser title', async function () {
      try {
        await browser.get(env.BASE)
        console.log(env.BASE)
        const title = await browser.getTitle()
        console.log('EVN TITLE', env.REACT_APP_TITLE)
        console.log('BROWSER TITLE', title)
        assert.strictEqual(title, env.REACT_APP_TITLE)
      } catch (error) {
        const screenshot = await browser.takeScreenshot()
        const base64Data = screenshot.replace(/^data:image\/png;base64,/, '')
        fs.writeFile('/persist/seleniumScreenShot.png', base64Data, 'base64', function (err) {
          if (err) console.log(err)
        })
        throw error
      }
    })
  })

  after(function () { browser.quit() })
})
