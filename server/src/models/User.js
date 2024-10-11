const {db, DataTypes} = require('../db/config.js')

let User = db.define('User', {
    id: DataTypes.INTEGER,
    username: DataTypes.STRING
})

module.exports = User