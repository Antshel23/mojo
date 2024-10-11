const { User } = require('./User')
const { Deck } = require('./Deck')
const { Card } = require('./Card')
const { Attack } = require('./Attack')

User.hasOne(Deck, {foreignKey: 'userId'})
Deck.belongsTo(User, {foreignKey: 'userId'})

Deck.hasMany(Card, {foreignKey: 'deckId'})
Card.belongsTo(Deck, {foreignKey: 'deckId'})

Card.belongsToMany(Attack, { through: 'CardAttack' });
Attack.belongsToMany(Card, { through: 'CardAttack' });

module.exports = { User, Deck, Card, Attack }
