/* eslint-disable handle-callback-err */
var fs = require('fs')
var request = require('request')
var macaroon = fs
  .readFileSync('server/api/testnet/admin.macaroon')
  .toString('hex')

// wallet_password: 'fullstackacademy'
// port: 127.16.19.16:8080
const genSeed = () => {
  let options = {
    url: 'https://127.16.19.16:8080/v1/genseed',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true
  }

  return request.get(options, function(error, response, body) {
    console.log(body)
    console.error(error)
  })
}

const initWallet = async password => {
  const seed = await genSeed()
  let requestBody = {
    wallet_password: password,
    cipher_seed_mnemonic: seed
  }

  let options = {
    url: 'https://127.16.19.16:8080/v1/initwallet',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    form: JSON.stringify(requestBody)
  }

  request.get(options, function(error, response, body) {
    console.log(body)
    console.error(error)
  })
}

const unlockwallet = (password, cb) => {
  let requestBody = {
    wallet_password: Buffer.from(password).toString('base64')
  }
  let options = {
    url: 'https://88506b5d.ngrok.io/v1/unlockwallet',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    form: JSON.stringify(requestBody)
  }
  request.post(options, function(error, response, body) {
    console.log(body)
    setTimeout(() => {
      cb()
    }, 3000)
  })
}

const getinfo = () => {
  let options = {
    url: 'https://88506b5d.ngrok.io/v1/getinfo',
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

const newAddress = () => {
  let options = {
    url: 'https://127.16.19.16:8080/v1/newaddress',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    }
  }
  request.get(options, function(error, response, body) {
    console.log(body)
  })
}

// balance() returns the wallet balance
const balance = () => {
  let options = {
    url: 'https://localhost:8080/v1/balance/blockchain',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    }
  }
  request.get(options, function(error, response, body) {
    console.log(body)
  })
}

// getPeers() lists all currently active peers
const getPeers = () => {
  let options = {
    url: 'https://localhost:8080/v1/peers',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    }
  }
  request.get(options, function(error, response, body) {
    console.log(body)
  })
}

// connect() establishes a connection to remote peers
const connect = () => {
  let requestBody = {
    addr: '',
    perm: true
  }
  let options = {
    url: 'https://localhost:8001/v1/newaddress',
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

// disconnect() destorys a connection to a specified remote peer
const disconnect = () => {
  let options = {
    url: 'https://localhost:8080/v1/peers/{pub_key}',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    }
  }
  request.delete(options, function(error, response, body) {
    console.log(body)
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
    url: 'https://localhost:8001/v1/newaddress',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    },
    form: JSON.stringify(requestBody)
  }
  request.get(options, function(error, response, body) {
    console.log(body)
  })
}

// listChannels() returns currently open channels with the node
const listChannels = () => {
  let options = {
    url: 'https://localhost:8080/v1/channels',
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Grpc-Metadata-macaroon': macaroon
    }
  }
  request.get(options, function(error, response, body) {
    console.log(body)
  })
}

const addInvoice = () => {
  let requestBody = {
    memo: '',
    receipt: 1,
    r_preimage: 1,
    r_hash: 1,
    value: '',
    settled: false,
    creation_date: '',
    settle_date: '',
    payment_request: '',
    description_hash: '',
    expiry: '',
    fallback_addr: '',
    cltv_expiry: '',
    route_hints: [],
    private: false,
    add_index: '',
    settle_index: '',
    amt_paid: '',
    amt_paid_sat: '',
    amt_paid_msat: '',
    state: ''
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

const sendPayment = () => {
  let requestBody = {
    dest: 1,
    dest_string: '',
    amt: '',
    payment_hash: 1,
    payment_hash_string: '',
    payment_request: '',
    final_cltv_delta: 1,
    fee_limit: '',
    outgoing_chan_id: ''
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
  addInvoice,
  sendPayment
}
