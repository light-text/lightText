const router = require('express').Router()
const MessagingResponse = require('twilio').twiml.MessagingResponse
const accountSid = 'ACc2b61ac520b4e67eb79117cb5fc64cee'
const authToken = '1c27ab091d4f3ab56589dc0b261190f1'
const client = require('twilio')(accountSid, authToken)
const {User} = require('../db/models')

const twilioPhone = '+18482202516'

module.exports = router

const sendMessage = (phone, body) => {
  client.messages
    .create({
      body: body,
      from: twilioPhone,
      to: phone
    })
    .then(message => console.log(message.sid))
}

const userExists = async phone => {
  try {
    const findUser = await User.findOne({
      where: {phone: phone}
    })

    if (findUser === null) {
      return {status: false}
    } else {
      return {status: true, userName: findUser}
    }
  } catch (err) {
    throw new Error(err)
  }
}

const getBody = body => {
  const arr = body.split(' ')
  return arr
}

const checkBalance = async (phone, amount) => {
  try {
    const findUser = await User.findOne({
      where: {phone: phone}
    })

    if (findUser.dataValues.wallet >= amount) {
      return true
    } else {
      return false
    }
  } catch (err) {
    throw new Error(err)
  }
}

const foundReceiverNumber = async receiverPhoneNumber => {
  try {
    const findReceiver = await User.findOne({
      where: {phone: receiverPhoneNumber}
    })
    if (findReceiver === null) {
      return {
        status: false
      }
    } else {
      return {
        status: true,
        receiverName: findReceiver
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

router.post('/', async (req, res, next) => {
  const body = getBody(req.body.Body)
  const action = body[0].toLowerCase()
  const amount = body[1]
  const receiverPhoneNumber = body[2]
  try {
    const twiml = new MessagingResponse()
    twiml.message(req.body.message)

    const phone = req.body.From

    const user = await userExists(phone)
    const doesBalanceHaveEnoughFounds = await checkBalance(phone, amount)
    const foundReceiver = await foundReceiverNumber(receiverPhoneNumber)
    console.log(user.userName.firstName, 'this shuld work')
    if (body.includes('help')) {
      const msg = `Check your balance with 'BALANCE'. \n Send a transaction with 'SEND' 'Amount in Satoshis' 'Recipient Phone Number' \n Example SEND +11234567890 300`
      sendMessage(phone, msg)
    } else if (
      user.status &&
      action === 'send' &&
      doesBalanceHaveEnoughFounds &&
      foundReceiver.status
    ) {
      const msg = `Boom. You made a lightning fast payment to ${
        foundReceiver.receiverName.firstName
      } for ${amount}`
      const msgReceiver = `Boom. You have got ${amount} from  ${
        user.userName.firstName
      }`

      sendMessage(phone, msg)
      sendMessage(receiverPhoneNumber, msgReceiver)
    } else if (action === 'balance') {
      const msg = `Your lightning balance is <BALANCE> satoshis.`
      sendMessage(phone, msg)
    } else {
      const msg = `Command not found. Please respond with 'HELP'.`
      sendMessage(phone, msg)
    }
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())
  } catch (err) {
    console.error(err)
    next(err)
  }
})
