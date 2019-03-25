/* eslint-disable handle-callback-err */
var fs = require('fs')
var grpc = require('grpc')
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'
const lnService = require('ln-service')

// port: 127.16.19.16:8080
const basePort = 'https://5b8484b6.ngrok.io'
// const basePort = 'https://192.168.1.1:8080'

const macaroon = fs
  .readFileSync('server/api/testnet/admin.macaroon')
  .toString('hex')
let metadata = new grpc.Metadata()
metadata.add('macaroon', macaroon)
let macaroonCreds = grpc.credentials.createFromMetadataGenerator(
  (_args, callback) => {
    callback(null, metadata)
  }
)

const lndCert = fs.readFileSync(
  '/home/milanpatel/Documents/Capstone/lightText/server/api/testnet/tls (5).cert'
)
const lndKey = fs.readFileSync(
  '/home/milanpatel/Documents/Capstone/lightText/server/api/testnet/tls (1).key'
)
let sslCreds = grpc.credentials.createSsl(lndCert)
let credentials = grpc.credentials.combineChannelCredentials(
  sslCreds,
  macaroonCreds
)

/*
const base64Cert = require('/home/milanpatel/Documents/Capstone/li ghtText/server/api/testnet/base64tls.cert');
const base64Macaroon = require('/home/milanpatel/Documents/Capstone/lightText/server/api/testnet/base64Admin.macaroon');

const lnd = lnService.lightningDaemon({
  cert: base64Cert,
  macaroon: base64Macaroon,
  socket: `${basePort}`,
});

lnService.getWalletInfo({lnd}, (error, result) => {
  console.log(result);
});
*/

const lnrpcDescriptor = grpc.load('server/api/rpc.proto')
const lnrpc = lnrpcDescriptor.lnrpc

const request = require('request')

const lightning = new lnrpc.Lightning(`${basePort}`, credentials)

/*
lightning.getinfo(request, function(err, response) {
  console.log(response);
})
*/
// wallet_password: 'fullstackacademy'

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
  lightning.getInfo({}, function(err, response) {
    console.log('GetInfo:', response)
    console.error(err)
  })

  /* lightning.getinfo()
  get(options, function(error, response, body) {
    console.log(body)
    console.error(error)
  }) */
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
  sendPayment,
  lightning
}
