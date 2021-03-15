// @ts-check

export default class Example {
  constructor(element) {
    this.element = element;
  }

  init() {
    this.element.textContent = 'hello, world!';
    this.element.classList.add('alert');
    this.element.classList.add('alert-primary');
    console.log('ehu!');
  }
}
