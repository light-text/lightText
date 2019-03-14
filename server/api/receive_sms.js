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
      return false
    } else {
      return true
    }
  } catch (err) {
    throw new Error(err)
  }
}

router.post('/', async (req, res, next) => {
  try {
    const twiml = new MessagingResponse()
    twiml.message(req.body.message)

    const phone = req.body.From
    const body = req.body.Body.toLowerCase()
    const status = await userExists(phone)
    if (body.includes('help')) {
      const msg = `Check your balance with 'BALANCE'. \n Send a transaction with 'SEND' 'Amount in Satoshis' 'Recipient Phone Number' \n Example SEND +11234567890 300`
      sendMessage(phone, msg)
    } else if (status && body.includes('send')) {
      const msg = `Boom. You made a lightning fast payment to PHONE for AMOUNT`
      sendMessage(phone, msg)
    } else if (body.includes('balance')) {
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
