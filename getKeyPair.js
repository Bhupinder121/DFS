const { generateKeyPairSync } = require("crypto")

const {privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'der',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'der',
  }
})

console.log(privateKey.toString("hex"));

exports.module = {publicKey, privateKey};