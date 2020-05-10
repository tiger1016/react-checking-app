require('dotenv').config()

/*
Used in npm run e2e
*/

const { argv } = require('yargs')
const fs = require('fs')
const path = require('path')
const Mocha = require('mocha')

const { _: positionals, mobile } = argv

const e2eArg = positionals[0]

let base = './'
if (mobile) {
  process.env.E2E_IS_MOBILE = true
  base = './mobile'
}

let mochaTargetDir = path.join(__dirname, base)

const mocha = new Mocha({
  bail: true,
  timeout: process.env.E2E_TIMEOUT_SECONDS
})

if (e2eArg) {
  const testChain = e2eArg.split(':')
  const pathToTest = testChain.reduce(
    (path, tag) => path + '/' + tag,
    base
  )

  mochaTargetDir = path.join(__dirname, pathToTest)

  fs.readdirSync(mochaTargetDir)
    .filter(f => f.substr(-3) === '.js')
    .forEach(f => mocha.addFile(path.join(mochaTargetDir, f)))
} else {
  fs.readdirSync(mochaTargetDir)
    .filter(f => f === 'index.js')
    .forEach(f => mocha.addFile(path.join(mochaTargetDir, f)))
}
mocha.run((failures) => { process.exitCode = failures ? 1 : 0 })
