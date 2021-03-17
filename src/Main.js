// @ts-check
import loadRss from './rss-loader';
import parseRss from './rss-parser';

export default class Main {
  constructor(element) {
    this.element = element;
  }

  render() {
    const main = document.createElement('main');
    main.classList.add('flex-grow-1');
    main.innerHTML = `
      <section class="container-fluid bg-dark p-5">
        <div class="row">
          <div class="col-md-10 col-lg-8 mx-auto text-white">
            <h1 class="display-2">
              RSS агрегатор
            </h1>
            <p class="lead">
              Начните читать RSS сегодня! Это легко, это красиво.
            </p>
            <form action class="rss-form">
              <div class="form-row d-flex">
                <div class="col px-1">
                  <input autofocus required name="url" aria-label="url" class="form-control form-control-lg w-100" placeholder="ссылка RSS">
                </div>
                <div class="col-auto px-1">
                  <button type="submit" aria-label="add" class="btn btn-lg btn-primary px-sm-5">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <p class="text-muted my-1">
              Пример: https://ru.hexlet.io/lessons.rss
            </p>
          </div>          
        </div>
      </section>
    `;
    this.element.parentNode.replaceChild(main, this.element);
    this.element = main;
  }

  bind() {
    const { element } = this;
    const form = element.querySelector('form');
    const input = form.querySelector('input');
    const submitButton = form.querySelector('button');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitButton.disabled = true;
      const { value } = input;
      loadRss(value)
        .then((data) => {
          input.value = '';
          const parsedData = parseRss(data);
          console.log(parsedData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
  }

  init() {
    this.render();
    this.bind();
    console.log('ehu!');
  }
}
