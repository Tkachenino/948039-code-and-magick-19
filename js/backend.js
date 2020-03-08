'use strict';
(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError();
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнитлься за ' + xhr.timeout + 'ms, попробуйте снова');
    });

    xhr.timeout = 1000;
    xhr.open('GET', URL);
    xhr.send();
  };

  window.save = function (data, onSuccess, onError) {
    var xhr = new this.XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError();
          break;
      }
    });

    xhr.open('POST', 'https://js.dump.academy/code-and-magick');
    xhr.send(data);
  };
})();
