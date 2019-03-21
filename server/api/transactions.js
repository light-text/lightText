const router = require('express').Router()
const {Transactions, User} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const receiver = await Transactions.findAll({
      where: {
        receiverId: req.user.id
      },
      include: ['sender']
    })
    const sender = await Transactions.findAll({
      where: {
        senderId: req.user.id
      },
      include: ['receiver']
    })
    res.json({receiver, sender})
  } catch (err) {
    next(err)
  }
})
