import { Card } from "./Card.js";

export class Memory {
  #cards;
  #pairsFound;
  #lastRevealedCard;
  #isWaiting;
  constructor() {
    this.#cards = [];
    this.#pairsFound = 0;
    this.#lastRevealedCard = null;
    this.#isWaiting = false;
  }

  newGame(pairsNumber) {
    this.#cards = [];
    this.#pairsFound = 0;
    this.#lastRevealedCard = null;
    this.#isWaiting = false;
    for (let i = 0; i < pairsNumber; i++) {
      const random = Math.random();
      const value = 0x1f90c + Math.floor(random * (0x1f9ff - 0x1f90c + 1));
      const card1 = new Card(value);
      const card2 = new Card(value);

      const index1 = Math.floor(Math.random() * (this.#cards.length + 1));
      this.#cards.splice(index1, 0, card1);

      const index2 = Math.floor(Math.random() * (this.#cards.length + 1));
      this.#cards.splice(index2, 0, card2);
    }
  }

  getCardsNumber() {
    return this.#cards.length;
  }

  getCard(index) {
    return this.#cards[index];
  }

  toData() {
    const myObject = {
      cards: this.#cards.map((card) => card.toData()),
      pairsFound: this.#pairsFound,
    };
    return myObject;
  }

  fromData(myData) {
    if (myData && myData.cards) {
      this.#cards = myData.cards.map((cardData) => {
        const card = new Card(cardData.value);
        if (cardData.faceHidden) {
          card.hide();
        } else {
          card.show();
        }

        return card;
      });
      this.#pairsFound = myData.pairsFound || 0;
    } else {
      this.#cards = [];
    }
  }

  showCard(index) {
    const card = this.#cards[index];

    if (this.#isWaiting) {
      return;
    }

    if (!card.faceHidden) {
      return;
    }

    card.show();

    if (!this.#lastRevealedCard) {
      this.#lastRevealedCard = card;
      return;
    }

    if (this.#lastRevealedCard.value === card.value) {
      this.#pairsFound++;
      this.#lastRevealedCard = null;
      if (this.#pairsFound * 2 === this.#cards.length) {
        this.newGame(10);
      }
    } else {
      this.#isWaiting = true;
      setTimeout(() => {
        console.log("hide");
        this.#lastRevealedCard.hide();
        card.hide();
        this.#lastRevealedCard = null;
        this.#isWaiting = false;
      }, 1000);
    }
  }
}
