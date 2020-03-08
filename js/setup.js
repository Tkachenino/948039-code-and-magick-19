'use strict';
(function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  var succsessHandler = function (data) {
    window.dataFilter = data;
    data = data.slice(0, 4);
    data.forEach(function (item) {
      var element = renderWizard(item);
      fragment.appendChild(element);
    });
    similarListElement.appendChild(fragment);
  };

  var errorHandler = function () {
  };
  window.load(succsessHandler, errorHandler);

  document.querySelector('.setup-similar').classList.remove('hidden');

  window.renderWizard = renderWizard;
  window.similarListElement = similarListElement;
})();
