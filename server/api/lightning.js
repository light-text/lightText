const router = require('express').Router()
const axios = require('axios')
const {crypto} = require('./crypto')

module.exports = router

// create, unlockwallet, getinfo, balance/blockchain, genseed, initwallet, newaddress
// channels/transactions
// connect, getpeers, openchannel,

router.get('/genseed', (req, res, next) => {
  const password = req.body.password
  var body = {}
  // '/v1/genseed'
  create(body)
})

router.get('/create', (req, res, next) => {
  const x = req.body
  var body = {x}
  create(body)
})

router.get('/unlockwallet', (req, res, next) => {})

router.get('/getinfo', (req, res, next) => {})

router.get('/newaddress', (req, res, next) => {})

router.get('/balance', (req, res, next) => {
  // '/balance/blockchain'
})

router.get('/connect', (req, res, next) => {})

router.get('/getpeers', (req, res, next) => {})

router.get('/openchannel', (req, res, next) => {})

router.get('/listchannels', (req, res, next) => {})

router.get('/addinvoice', (req, res, next) => {
  // '/v1/invoices'
})

router.get('/sendpayment', (req, res, next) => {
  // '/v1/channels/transactions'
})
