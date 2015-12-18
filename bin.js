#!/usr/bin/env node

var spawn = require('child_process').spawn
var net = require('net')
var lookup = require('lookup-multicast-dns')
var register = require('register-multicast-dns')
var fs = require('fs')
var minimist = require('minimist')
var toPort = require('hash-to-port')

var argv = minimist(process.argv.slice(2), {alias: {station: 's'}, '--': true})
var port = argv.port || (argv.station ? toPort(argv.station) : 24242)
var name = 'deejay-' + (argv.station || 'default')

if (argv._[0]) {
  var source = null
  var server = net.createServer(function (socket) {
    if (!source) source = fs.createReadStream(argv._[0])
    source.pipe(socket)
    socket.on('error', function () {
      socket.destroy()
    })
  })
  server.listen(port)
  register(name)
}


lookup(name, function (err, host) {
  var socket = net.connect(port, host)
  var proc = spawn('mplayer', ['-cache', '1024'].concat(argv['--'] || []).concat('-'), {stdio: [null, 'inherit', 'inherit']})
  socket.pipe(proc.stdin)
  proc.on('error', function () {
    console.error('mplayer is required (brew install mplayer / apt-get install mplayer)')
    process.exit(1)
  })
  proc.on('exit', function (code) {
    process.exit(code)
  })
})
