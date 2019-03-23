/* eslint-disable */

const router = require('express').Router()
const axios = require('axios')
const MessagingResponse = require('twilio').twiml.MessagingResponse
const client = require('twilio')(
  process.env.twilioSid,
  process.env.twilioAuthToken
)
const {User} = require('../db/models')
const {unlockwallet, getinfo} = require('./crypto')
const {Transactions} = require('../db/models')

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
        number: findUser.dataValues.phone,
        userId: findUser.dataValues['id']
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
    if (!findUser) console.log('This user does not exist: ', findUser)
    return findUser.dataValues.balance
  } catch (err) {
    throw new Error(err)
  }
}

const getCurrencies = async () => {
  try {
    return await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
  } catch (error) {
    console.error(error)
  }
}

const getBody = message => {
  let msg = message.split(' ')
  return msg.filter(word => {
    return word !== ' ' && word.length > 0
  })
}

router.post('/', async (req, res, next) => {
  let body,
    action,
    amount,
    receiverPhone,
    senderPhone,
    webUserName,
    messageFromWeb

  if (req.body.messages) {
    messageFromWeb = await findUserByUsername(getBody(req.body.messages)[2])
    body = getBody(req.body.messages)
    action = body[0].toLowerCase()
    amount = body[1]
    if (body.length !== 1) {
      receiverPhone = messageFromWeb.number
      webUserName = messageFromWeb.userName
    }
    senderPhone = req.user.phone
  } else {
    body = getBody(req.body.Body)
    action = body[0].toLowerCase()
    amount = body[1]
    receiverPhone = body[2]
    senderPhone = req.body.From
  }

  try {
    const twiml = new MessagingResponse()
    twiml.message(req.body.message)

    let ourReceiver = await findUserByUsername(receiverPhone)

    if (ourReceiver === null) {
      ourReceiver = {username: false}
    }

    const sender = (await findUserByPhone(senderPhone)) || 'undefined'

    const receiver =
      (await findUserByPhone(receiverPhone)) ||
      (await ourReceiver.userName) ||
      'undefined'

    const balance = await getBalance(senderPhone)
    const hasSufficientFunds = balance >= amount
    const converterUSD = await getCurrencies()
    const usdRate = converterUSD.data.bpi.USD.rate_float
    const balanceBTC = balance / 100000000
    const balanceUSD = balance * usdRate / 100000000

    const messages = {
      helpme: `Check your balance with 'BALANCE'. \n Send a transaction with 'SEND' 'Amount in Satoshis' 'Recipient Phone Number' \n Example SEND 300 +11234567890`,
      balance: `Your lightning balance is ${balance} satoshis ($${balanceUSD.toFixed(
        2
      )} USD, ${balanceBTC} BTC).`,
      signup:
        'You are not registered with LightText. Please go to LightText.io to signup.',
      receiver:
        'The user you are trying to pay is not registered with us. Please try another user.',
      insufficientBalance:
        'You have insufficient funds. Please enter REFILL to up your funding.',
      sent: `Boom. You made a lightning fast payment to ${ourReceiver.userName ||
        webUserName} for ${amount}`,
      received: `Boom. You received a lightning fast payment for ${amount} from ${
        sender.username
      }`,
      refill:
        "We are in beta, please don't send more than $20 to the following address",
      negativeAmount: 'You can only send positive amounts',
      notANumber:
        'You need to enter a valid amount in order to make payments. Example SEND 300 +11234567890'
    }

    if (!sender) {
      sendMessage(senderPhone, messages.signup)
    } else {
      switch (action) {
        case 'refill':
          setTimeout(() => {
            return sendMessage(senderPhone, '46283hkehwejriy5i234982')
          }, 400)

          sendMessage(senderPhone, messages.refill)
          break
        case 'balance': {
          // console.log('YOU ARE IN BALANCE SWITCH STATEMENT')
          // unlockwallet('fullstackacademy', getinfo)
          //  .then(getinfo());

          sendMessage(senderPhone, messages.balance)
          break
        }
        case 'helpme':
          sendMessage(senderPhone, messages.helpme)
          break
        case 'send':
          if (receiver === 'undefined') {
            sendMessage(senderPhone, messages.receiver)
            break
          }
          if (isNaN(amount)) {
            sendMessage(senderPhone, messages.notANumber)
            break
          }
          if (!hasSufficientFunds) {
            sendMessage(senderPhone, messages.insufficientBalance)
            break
          }
          if (amount <= 0) {
            sendMessage(senderPhone, messages.negativeAmount)
            break
          }

          sendMessage(senderPhone, messages.sent)

          sendMessage(ourReceiver.number || receiverPhone, messages.received)
          Transactions.create({
            amount: amount,
            receiverId: ourReceiver.userId || messageFromWeb.userId,
            senderId: sender['id']
          })

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
