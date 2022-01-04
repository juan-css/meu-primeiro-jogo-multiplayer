import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()
            
game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})
game.addPlayer({playerId: 'filipe', playerX: 1, playerY: 0})
game.addPlayer({playerId: 'juan', playerX: 1, playerY: 0})
game.addFruit({fruitId: 'fruit1', fruitX: 4, fruitY: 5})
game.addFruit({fruitId: 'fruit2', fruitX: 8, fruitY: 7})
game.addFruit({fruitId: 'fruit3', fruitX: 8, fruitY: 9})
        
// console.log(game.state)

sockets.on('connect', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected on Server with id: ${playerId}`)

    game.addPlayer({playerId: playerId})
    console.log(game.state)

    // envia o state do jogo para cada novo client
    socket.emit('setup', game.state)
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})