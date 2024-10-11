const {db, DataTypes} = require('../db/config.js')

let Attack = db.define('Attack', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    title: DataTypes.STRING,
    mojoCost: DataTypes.INTEGER,
    staminaCost: DataTypes.INTEGER
})

module.exports = { Attack }