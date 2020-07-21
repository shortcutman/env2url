const querystring = require('querystring')
const http = require('http')

const commandLineArgs = require('command-line-args')
const cmdlineDefinitions = [
  { name: 'host', type: String },
  { name: 'port', type: Number },
  { name: 'path', type: String }
]
const cmdArgs = commandLineArgs(cmdlineDefinitions)

const filteredEnv = Object.keys(process.env)
  .filter(key => !key.startsWith('npm_'))
  .reduce((obj, key) => {
    obj[key] = process.env[key]
    return obj
  }, {})

console.log(filteredEnv)
var envData = querystring.stringify(filteredEnv);

var options = {
  host: cmdArgs.host,
  port: cmdArgs.port,
  path: cmdArgs.path,
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
