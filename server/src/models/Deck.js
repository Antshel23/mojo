const {db, DataTypes} = require('../db/config.js')

let Deck = db.define('Deck', {
    name: 'x'
})
module.exports = Deck