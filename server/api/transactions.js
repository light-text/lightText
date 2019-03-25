const router = require('express').Router()
const {Transactions} = require('../db/models')

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
    const message = req.body.message
    res.json({receiver, sender, message})
  } catch (err) {
    next(err)
  }
})
