'use strict';
(function () {
  var uniqWizards = [];
  var form = document.querySelector('.setup-wizard-form');
  var myWizard = document.querySelector('.setup-player');

  var filterCoat = function (data) {
    return myWizard.querySelector('[name="coat-color"]').value === data.colorCoat;
  };

  var filterEyes = function (data) {
    return myWizard.querySelector('[name="eyes-color"]').value === data.colorEyes;
  };

  form.addEventListener('click', function () {
    while (document.querySelector('.setup-similar-item')) {
      document.querySelector('.setup-similar-item').remove();
    }
    uniqWizards = window.dataFilter
    .filter(filterCoat)
    .filter(filterEyes)
    .concat(window.dataFilter);
    var fragment = document.createDocumentFragment();
    uniqWizards = uniqWizards.slice(0, 4);
    uniqWizards.forEach(function (item) {
      var element = window.renderWizard(item);
      fragment.appendChild(element);
    });
    window.similarListElement.appendChild(fragment);

  });

})();
