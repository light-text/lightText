/* eslint-disable handle-callback-err */

var fs = require('fs')
const request = require('request')

const basePort = 'https://localhost:8080'
// const basePort = 'https://192.168.1.1:8080'
const walletPassword = 'hello'

const macaroon = fs
  .readFileSync('server/api/testnet/admin.macaroon')
  .toString('hex')

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
    url: `${basePort}/v1/unlockwallet`,
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

// newAddress() returns the a new Bitcoin address for refills
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
const connect = addr => {
  let requestBody = {
    addr: addr,
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
const disconnect = addr => {
  let options = {
    url: `https://localhost:8080/v1/peers/${addr}`,
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

// openChannel() opens a channel with the specified node
const openChannel = (addr, amount) => {
  let requestBody = {
    node_pubkey: addr,
    local_funding_amount: amount
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

// getInvoice() returns an invoice based on a payment hash - payRequest must be exactly 32 bytes
const getInvoice = payRequest => {
  let options = {
    url: `https://localhost:8080/v1/invoices/${payRequest}`,
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

// sendPayment() uses the invoice payment request to send a payment
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
