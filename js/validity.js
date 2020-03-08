'use strict';
(function () {
  var MIN_NAME_LENGTH = 2;
  var setup = document.querySelector('.setup');
  var form = document.querySelector('.setup-wizard-form');
  var userNameInput = setup.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('имя персонажа не может содержать менее 2 символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('максимальная длина имени персонажа — 25 символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_NAME_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.dialog.onPopupEscPress);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.dialog.onPopupEscPress);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(form),
        function () {
          document.querySelector('.setup').classList.add('hidden');
        },
        function () {
          console.log('Ошибка отправки формы');
        });
  });
})();
