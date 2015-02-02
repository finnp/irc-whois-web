# irc-whois-web
[![NPM](https://nodei.co/npm/irc-whois-web.png)](https://nodei.co/npm/irc-whois-web/)

Service that serves irc whois information as json routes.

# env config and defaults
```js
var nick = process.env['IRCWHOIS_NICK'] || 'irc-whois-web'
var server = process.env['IRCWHOIS_SERVER'] || 'irc.freenode.net'
var port = process.env['IRCWHOIS_LISTEN'] || 8080
```
