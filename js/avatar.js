'use strict';
(function () {
  var fileChouser = document.querySelector('.upload');
  var avatar = fileChouser.querySelector('img');
  fileChouser.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      avatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  });
})();
