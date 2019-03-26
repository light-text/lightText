let fs = require('fs')

const promisify = () => {
  let x = new Promise((resolve, reject) => {
    fs.readFile('./data.txt', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })

  return x
}

module.exports = promisify
