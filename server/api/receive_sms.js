const router = require('express').Router()
const MessagingResponse = require('twilio').twiml.MessagingResponse

module.exports = router

router.post('/', (req, res) => {
  const twiml = new MessagingResponse()

  twiml.message(req.body.message)
  console.log('Can you see me!', req.body.Body)

  res.writeHead(200, {'Content-Type': 'text/xml'})
  res.end(twiml.toString())
})
