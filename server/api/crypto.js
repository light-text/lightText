/* eslint-disable handle-callback-err */
var fs = require('fs')
const request = require('request')

const basePort = 'https://localhost:8080'
// const basePort = 'https://192.168.1.1:8080'
const walletPassword = 'hello'

const macaroon = fs
  .readFileSync('server/api/testnet/admin.macaroon')
  .toString('hex')
const getinfo = () => {
  let options = {
    url: `${basePort}/v1/getinfo`,
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    }
  }

  request.get(options, function(error, response, body) {
    console.log(body)
    console.error(error)
  })
}
// openChannel() returns the wallet balance
const openChannel = () => {
  let requestBody = {
    node_pubkey: 1,
    node_pubkey_string: '',
    local_funding_amount: '',
    push_sat: '',
    target_conf: '',
    sat_per_byte: '',
    private: false,
    min_htlc_msat: '',
    remote_csv_delay: '',
    min_confs: 1,
    spend_unconfirmed: false
  }
  let options = {
    url: 'https://localhost:8001/v1/channels',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    },
    form: JSON.stringify(requestBody)
  }
  request.post(options, function(error, response, body) {
    console.log(body)
  })
}
const getInvoice = () => {
  let options = {
    url: 'https://localhost:8080/v1/invoices/{payment_hash}',
    // requires payment hash in URL above
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    }
  }
  request.post(options, function(error, response, body) {
    console.log(body)
  })
}

const addInvoice = amount => {
  let requestBody = {
    value: amount
  }

  let options = {
    url: 'https://localhost:8080/v1/invoices',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    },
    form: JSON.stringify(requestBody)
  }
  request.post(options, function(error, response, body) {
    console.log(body)
  })
}

const sendPayment = invoice => {
  let requestBody = {
    payment_request: invoice
  }

  let options = {
    url: 'https://localhost:8080/v1/channels/transactions',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    },
    form: JSON.stringify(requestBody)
  }
  request.post(options, function(error, response, body) {
    console.log(body)
  })
}

module.exports = {
  genSeed,
  initWallet,
  unlockwallet,
  getinfo,
  newAddress,
  balance,
  getPeers,
  connect,
  disconnect,
  openChannel,
  listChannels,
  getInvoice,
  addInvoice,
  sendPayment
}
