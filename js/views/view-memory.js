import { Observer } from "../patterns/observer.js";

export class ViewMemory extends Observer {
  #controllerMemory;

  constructor(controllerMemory) {
    super();

    this.#controllerMemory = controllerMemory;
    this.#controllerMemory.addObserver(this);
  }

  displayCard(card, index) {
    const b_card = document.querySelector(".cards");
    const created_card = document.createElement("div");
    created_card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    created_card.appendChild(cardInner);

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.innerHTML = "<p>&#" + Math.floor(card.value) + ";</p>";
    cardInner.appendChild(cardFront);

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardInner.appendChild(cardBack);

    if (card.faceHidden) {
      created_card.classList.add("hidden");
    } else {
      created_card.classList.add("visible");
    }

    b_card.appendChild(created_card);

    created_card.addEventListener("click", () => {
      if (created_card.classList.contains("hidden")) {
        created_card.classList.remove("hidden");
        created_card.classList.add("visible");
      }
      console.log(created_card.classList);
      this.#controllerMemory.showCard(index);
      setTimeout(() => {
        this.#controllerMemory.notify();
        this.#controllerMemory.saveGame();
      }, 1000);
    });
  }

  displayCards() {
    const b_card = document.querySelector(".cards");
    b_card.innerHTML = "";

    for (let i = 0; i < this.#controllerMemory.memory.getCardsNumber(); i++) {
      let card = this.#controllerMemory.memory.getCard(i);
      this.displayCard(card, i);
    }
  }


  notify() {
    this.displayCards();
  }
}
