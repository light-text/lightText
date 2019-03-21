const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/sms', require('./receive_sms'))

router.use('/lightning', require('./lightning'))
router.use('/transactions', require('./transactions'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
