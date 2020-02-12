'use strict';
(function () {
  var getRandomFromArr = function (arr) {
    return Math.round(Math.random() * (arr.length - 1));
  };

  var myWizard = document.querySelector('.setup-player');
  var myWizardCoat = myWizard.querySelector('.wizard-coat');
  var myWizardEyes = myWizard.querySelector('.wizard-eyes');
  var myWizardFierBall = myWizard.querySelector('.setup-fireball-wrap');

  myWizardCoat.addEventListener('click', function () {
    var thisCoatColor = window.parameters.coatColor[getRandomFromArr(window.parameters.coatColor)];
    myWizardCoat.style = 'fill:' + thisCoatColor;
    myWizard.querySelector('[name="coat-color"]').value = thisCoatColor;
  });
  myWizardEyes.addEventListener('click', function () {
    var thisEyesColor = window.parameters.eyesColor[getRandomFromArr(window.parameters.eyesColor)];
    myWizardEyes.style = 'fill:' + thisEyesColor;
    myWizard.querySelector('[name="eyes-color"]').value = thisEyesColor;
  });
  myWizardFierBall.addEventListener('click', function () {
    var thisFierballColor = window.parameters.fierballColor[getRandomFromArr(window.parameters.fierballColor)];
    myWizardFierBall.style = 'background-color:' + thisFierballColor;
    myWizard.querySelector('[name="fireball-color"]').value = thisFierballColor;
  });
})();
