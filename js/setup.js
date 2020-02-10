'use strict';
(function () {
  var getRandomFromArr = function (arr) {
    return Math.round(Math.random() * (arr.length - 1));
  };
  var NUMBER_OF_WIZARDS = 4;
  var wizards = [];
  var buildSettingWizard = function (arr) {
    arr.push({name: window.parameters.wizardName[getRandomFromArr(window.parameters.wizardName)] + '\t' + window.parameters.wizardSurname[getRandomFromArr(window.parameters.wizardSurname)],
      coatColor: window.parameters.coatColor[getRandomFromArr(window.parameters.coatColor)],
      eyesColor: window.parameters.eyesColor[getRandomFromArr(window.parameters.eyesColor)]
    });
  };

  for (var j = 0; j < NUMBER_OF_WIZARDS; j++) {
    buildSettingWizard(wizards);
  }

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
