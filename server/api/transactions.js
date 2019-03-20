const router = require('express').Router()
const {Transactions, User} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Transactions.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
