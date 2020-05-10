const waitForElementFound = require('./waitForElementFound')

module.exports = (b, testTarget, msWait) => async () => {
  await waitForElementFound(b, testTarget, msWait)
}
