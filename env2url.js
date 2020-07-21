var querystring = require('querystring')
var http = require('http')

const filteredEnv = Object.keys(process.env)
  .filter(key => !key.startsWith('npm_'))
  .reduce((obj, key) => {
    obj[key] = process.env[key]
    return obj
  }, {})

console.log(filteredEnv)
var envData = querystring.stringify(filteredEnv);

var options = {
  host: 'localhost',
  port: '8111',
  path: '/raspotify',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(envData)
  }
}

var request = http.request(options, (result) => {
  result.setEncoding('utf8')
  result.on('data', (chunk) => {
    console.log('Response:', chunk)
  })
})

request.write(envData)
request.end()
