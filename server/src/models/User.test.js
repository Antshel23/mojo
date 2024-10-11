const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { User } = require('./User.js');
const { Deck } = require('./Deck.js');
const { Card } = require('./Card.js');
const { Attack } = require('./Attack.js');
const { db } = require('../db/config.js');

// define in global scope
let user;
let deck;
let card;
let attack;

// clear db and create new user and deck before tests
beforeAll(async () => {
  await db.sync({ force: true });
  user = await User.create({ username: 'test1' });
  deck = await Deck.create({ name: 'test2' });
  card = await Card.create({ name: 'test3' });
  attack = await Attack.create({ title: 'test4'})
});

// clear db after tests
afterAll(async () => await db.close());

describe('User', () => {
  it('has an id', async () => {
    expect(user).toHaveProperty('id');
  });
  it('has the correct username', async () => {
    expect(user.username).toBe('test1');
  });
});

describe('Deck', () => {
  it('has an id', async () => {
    expect(deck).toHaveProperty('id');
  });
  it('has the correct name', async () => {
    expect(deck.name).toBe('test2');
  });
});

describe('Card', () => {
  it('has an id', async () => {
    expect(card).toHaveProperty('id');
  });
  it('has the correct name', async () => {
    expect(card.name).toBe('test3');
  });
});

describe('Attack', () => {
  it('has an id', async () => {
    expect(attack).toHaveProperty('id');
  });
  it('has the correct title', async () => {
    expect(attack.title).toBe('test4');
  });
});

