const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {
  amount: {
    type: Sequelize.INTEGER
  }
})

module.exports = Transactions
