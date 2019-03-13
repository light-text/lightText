const accountSid = 'ACc2b61ac520b4e67eb79117cb5fc64cee'
const authToken = '1c27ab091d4f3ab56589dc0b261190f1'
const client = require('twilio')(accountSid, authToken)

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+18482202516',
    to: '+17328595701'
  })
  .then(message => console.log(message.sid))
