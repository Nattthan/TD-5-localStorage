export class Card {
  #value = 0;
  #faceHidden = true;
  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  get faceHidden(){
    return this.#faceHidden;
  }

  show(){
    this.#faceHidden = false;
  }

  hide(){
    this.#faceHidden = true;
  }

  toData() {
    const myObject = {
      value: this.#value,
      faceHidden: this.#faceHidden,
    };
    return myObject;
  }

}
