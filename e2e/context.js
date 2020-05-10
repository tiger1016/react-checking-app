/*
  use this class to share data between tests
*/
class Context {
  constructor () {
    this.chain = null

    this.getChain = this.getChain.bind(this)
    this.setChain = this.setChain.bind(this)
  }

  setChain (parentName) {
    this.chain = parentName
  }

  getChain () {
    return this.chain
  }
}

module.exports = new Context()
