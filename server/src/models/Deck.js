const {db, DataTypes} = require('../db/config.js')

let Deck = db.define('Deck', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER
})

module.exports = { Deck }