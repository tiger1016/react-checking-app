// This cannot use robot.js
const browser = require('../../../browser')
const { By, until } = require('selenium-webdriver')
const robot = require('robotjs')

const msWait = 110000

describe('Add a profile image, verify that it saved correctly.', function () {
  it('Add a profile image', async function () {
    await browser.wait(until.elementLocated(By.className('t-image-uploader')), msWait)
    await browser.findElement(By.className('t-image-uploader')).click()
    await robot.typeString('C:\\Users\\alvaro\\Desktop\\buss\\petcheck notes\\3.jpg')
    await robot.keyTap('enter')
    await browser.sleep(2000)
    await browser.findElement(By.css('div#ProfilePic button')).click()
  })
})
