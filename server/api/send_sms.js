const client = require('twilio')(
  process.env.twilioSid,
  process.env.twilioAuthToken
)

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+18482202516',
    to: '+17328595701'
  })
  .then(message => console.log(message.sid))
