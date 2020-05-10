module.exports = async function (browser, el, msWait) {
  try {
    await browser.wait(
      async () => (await el.getAttribute('value') || '').length > 0,
      msWait
    )
  } catch (error) {
    throw error
  }
}
