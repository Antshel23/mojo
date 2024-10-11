const { describe, it, expect, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const { User, Deck, Card, Attack } = require('./index.js');
const { db } = require('../db/config.js');

beforeAll(async () => {
  await db.sync({ force: true });
});

afterAll(async () => await db.close());

describe('User', () => {
  let user;
  beforeEach(async () => {
    user = await User.create({ username: 'test1' });
  });

  it('has an id', async () => {
    expect(user).toHaveProperty('id');
  });

  it('has the correct username', async () => {
    expect(user.username).toBe('test1');
  });
});

describe('Deck', () => {
  let user, deck;
  beforeEach(async () => {
    user = await User.create({ username: 'test1' });
    deck = await Deck.create({ name: 'test2', userId: user.id });
  });

  it('has an id', async () => {
    expect(deck).toHaveProperty('id');
  });

  it('has the correct name', async () => {
    expect(deck.name).toBe('test2');
  });
});

describe('Card', () => {
  let deck, card;

  beforeEach(async () => {
    const user = await User.create({ username: 'test1' });
    deck = await Deck.create({ name: 'test2', userId: user.id });
    card = await Card.create({ name: 'test3', deckId: deck.id });
  });

  it('has an id', async () => {
    expect(card).toHaveProperty('id');
  });

  it('has the correct name', async () => {
    expect(card.name).toBe('test3');
  });
});

describe('Attack', () => {
  let attack;
  beforeEach(async () => {
    attack = await Attack.create({ title: 'test4' });
  });

  it('has an id', async () => {
    expect(attack).toHaveProperty('id');
  });

  it('has the correct title', async () => {
    expect(attack.title).toBe('test4');
  });
});

describe('Associations', () => {
let user1, deck1, user2, deck2, card1, card2, card3, attack1, attack2
  beforeEach(async () => {
    user1 = await User.create({ username: 'user1' });
    user2 = await User.create({ username: 'user2' });
    deck1 = await Deck.create({ name: 'deck1', userId: user1.id });
    deck2 = await Deck.create({ name: 'deck2', userId: user2.id });
    card1 = await Card.create({ name: 'card1', deckId: deck1.id });
    card2 = await Card.create({ name: 'card2', deckId: deck1.id });
    card3 = await Card.create({ name: 'card3', deckId: deck1.id });

    attack1 = await Attack.create({ title: 'attack1' });
    attack2 = await Attack.create({ title: 'attack2' });

    // Associate attacks with cards
    await card1.addAttack(attack1);
    await card1.addAttack(attack2);
    await card2.addAttack(attack1);
  });

  it('User-Deck one to one', async () => {
  const userDeck1 = await user1.getDeck()
  const userDeck2 = await user2.getDeck()
  expect(userDeck1.name).toBe('deck1')
  expect(userDeck2.name).toBe('deck2')
  });

  it('Deck-Cards one to many', async () => {
    const deckCards1 = await deck1.getCards();
    expect(deckCards1).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: card1.id, name: card1.name }),
      expect.objectContaining({ id: card2.id, name: card2.name }),
      expect.objectContaining({ id: card3.id, name: card3.name }),
    ]));
  });

  it('Cards-Attacks many to many', async () => {
    const card1Attacks = await card1.getAttacks();
    const card2Attacks = await card2.getAttacks();

    expect(card1Attacks).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: attack1.id, title: attack1.title }),
      expect.objectContaining({ id: attack2.id, title: attack2.title }),
    ]));

    expect(card2Attacks).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: attack1.id, title: attack1.title }),
    ]));

    expect(card2Attacks).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ id: attack2.id, title: attack2.title }),
    ]));
  });
});