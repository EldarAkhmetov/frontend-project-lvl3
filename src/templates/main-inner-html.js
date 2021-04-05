export default `
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <a type="button" href="#" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Читать полностью</a>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
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
              <input autofocus required name="url" type="url" aria-label="url" class="form-control form-control-lg w-100" placeholder="ссылка RSS">
            </div>
            <div class="col-auto px-1">
              <button type="submit" aria-label="add" class="btn btn-lg btn-primary px-sm-5" name="add">
                Add
              </button>
            </div>
          </div>
        </form>
        <p class="text-muted my-1">
          Пример: https://ru.hexlet.io/lessons.rss
        </p>
        <div class="feedback text-success">
          RSS успешно загружен 
        </div>
        <div class="feedback text-success text-danger d-none">
        </div>
      </div>          
    </div>
  </section>
  <section class="container-fluid p-5" name="feed">
    <div class="row" name="feed-info">
    </div>
    <div class="row" name="articles">
    </div>
  </section>
`;
