var irc = require('irc')
var http = require('http')

var nick = process.env['IRCWHOIS_NICK'] || 'irc-whois-web'
var server = process.env['IRCWHOIS_SERVER'] || 'irc.freenode.net'
var port = process.env['IRCWHOIS_LISTEN'] || 8080


var client = new irc.Client(server, nick)

var requested = {}

http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  var username = req.url.slice(1)

  if(!username) return res.end(JSON.stringify({'connection' : client.conn.readyState}))
  
  if(requested[username] && requested[username].length > 0) {
    requested[username].push(res)
  } else {
    client.whois(username)
    requested[username] = [res]
  }
}).listen(port)

client.on('whois', function (data) {
  var nick = data.nick
  var res
  if(requested[nick]) {
    while(res = requested[nick].shift())
      res.end(JSON.stringify(data))
  }
})

client.on('error', function (err) {
  console.error(err)
})

console.log('Listening on', port)
