const {db, DataTypes} = require('../db/config.js')

let User = db.define('User', {
    name: 'x'
})
module.exports = User