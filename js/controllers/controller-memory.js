import { Memory } from "../models/Memory.js";
import { Notifier } from "../patterns/notifier.js";

export class ControllerMemory extends Notifier {
  #memory;
  constructor() {
    super();
    this.#memory = new Memory();
  }

  get memory() {
    return this.#memory;
  }

  newGame() {
    this.#memory.newGame(10);
    this.notify();
    this.saveGame();
  }

  saveGame() {
    const myDataAsString = JSON.stringify(this.#memory.toData());
    localStorage.setItem("memory", myDataAsString);
  }

  showCard(index){
    this.#memory.showCard(index);
  }

  loadGame() {
    const myDataAsString = localStorage.getItem("memory");
    if (myDataAsString) {
      const myData = JSON.parse(myDataAsString);
      this.#memory.fromData(myData);
      this.notify();
      return true;
    }
    return false;
  }

  start(){
    if (!this.loadGame()) {
      console.log("No game loaded");
      this.newGame();
    }
    else {
      console.log("Game loaded");
    }
  }
}
