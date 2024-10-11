const {db, DataTypes} = require('../db/config.js')

let User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    username: DataTypes.STRING
})

module.exports = { User }