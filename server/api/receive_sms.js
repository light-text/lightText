/* eslint-disable */

const router = require('express').Router()
const MessagingResponse = require('twilio').twiml.MessagingResponse
const client = require('twilio')(
  process.env.twilioSid,
  process.env.twilioAuthToken
)
const {User} = require('../db/models')

const twilioPhone = process.env.twilionumber

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

const findUserByPhone = async phone => {
  try {
    const findUser = await User.findOne({
      where: {phone: phone}
    })

    return null || findUser
  } catch (err) {
    throw new Error(err)
  }
}

const findUserByUsername = async userName => {
  try {
    const findUser = await User.findOne({
      where: {username: userName}
    })

    if (!findUser) return null
    else {
      return {
        userName: findUser.dataValues.username,
        number: findUser.dataValues.phone
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

const getBalance = async phone => {
  try {
    const findUser = await User.findOne({
      where: {phone: phone}
    })
    return findUser.dataValues.balance
  } catch (err) {
    throw new Error(err)
  }
}

const getBody = message => {
  let msg = message.split(' ')
  return msg.filter(word => {
    return word !== ' ' && word.length > 0
  })
}

router.post('/', async (req, res, next) => {
  const body = getBody(req.body.Body)
  const action = body[0].toLowerCase()
  const amount = body[1]
  const receiverPhone = body[2]
  const refillWallet = 'weri4343yruicj2345djh12432mnxc33234'

  console.log(
    'BODY IS: ',
    body,
    'action is: ',
    action,
    'amount is ',
    amount,
    'receiver phone is: ',
    receiverPhone
  )
  try {
    const twiml = new MessagingResponse()
    twiml.message(req.body.message)

    const ourReceiver = await findUserByUsername(receiverPhone)

    const senderPhone = req.body.From
    const sender = (await findUserByPhone(senderPhone)) || 'undefined'

    const receiver =
      (await findUserByPhone(receiverPhone)) ||
      (await ourReceiver.userName) ||
      'undefined'

    const balance = await getBalance(senderPhone)
    const hasSufficientFunds = balance >= amount

    const messages = {
      helpme: `Check your balance with 'BALANCE'. \n Send a transaction with 'SEND' 'Amount in Satoshis' 'Recipient Phone Number' \n Example SEND 300 +11234567890`,
      balance: `Your lightning balance is ${balance} satoshis.`,
      signup:
        'You are not registered with LightText. Please go to LightText.io to signup.',
      receiver:
        'The user you are trying to pay is not registered with us. Please try another user.',
      insufficientBalance:
        'You have insufficient funds. Please enter REFILL to up your funding.',
      sent: `Boom. You made a lightning fast payment to ${
        receiver.username
      } for ${amount}`,
      received: `Boom. You received a lightning fast payment for ${amount} from ${
        sender.username
      }`,
      refill:
        "We are in beta, please don't send more than $20 to the following address"
    }

    if (!sender) {
      return sendMessage(senderPhone, messages.signup)
    } else {
      switch (action) {
        case 'refill':
          setTimeout(() => {
            return sendMessage(senderPhone, refillWallet)
          }, 400)
          return sendMessage(senderPhone, messages.refill)
        case 'balance':
          return sendMessage(senderPhone, messages.balance)
        case 'helpme':
          return sendMessage(senderPhone, messages.helpme)
        case 'send':
          if (receiver === 'undefined') {
            console.log(receiver, 'why is not working')
            return sendMessage(senderPhone, messages.receiver)
          }
          if (!hasSufficientFunds) {
            return sendMessage(senderPhone, messages.insufficientBalance)
          }

          sendMessage(senderPhone, messages.sent)
          sendMessage(ourReceiver.number, messages.received)

          break
        default:
          sendMessage(senderPhone, messages.helpme)
      }
    }

    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())
  } catch (err) {
    console.error(err)
    next(err)
  }
})
