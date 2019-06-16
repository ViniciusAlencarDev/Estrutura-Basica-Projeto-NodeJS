const ip = require('ip')

const serverConfig = {
    protocol: 'http',
    ip: ip.address(),
    port: 8080
}

module.exports = serverConfig