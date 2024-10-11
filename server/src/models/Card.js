const {db, DataTypes} = require('../db/config.js')

let Card = db.define('Card', {
    name: 'x'
})
module.exports = Card