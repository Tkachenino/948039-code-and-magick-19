'use strict';
var wizardName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurname = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var fierballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_NAME_LENGTH = 2;
var getRandomFromArr = function (arr) {
  return Math.round(Math.random() * (arr.length - 1));
};
var NUMBER_OF_WIZARDS = 4;
var wizards = [];
var buildSettingWizard = function (arr) {
  arr.push({name: wizardName[getRandomFromArr(wizardName)] + '\t' + wizardSurname[getRandomFromArr(wizardSurname)],
    coatColor: coatColor[getRandomFromArr(coatColor)],
    eyesColor: eyesColor[getRandomFromArr(eyesColor)]
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

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var myWizard = document.querySelector('.setup-player');
var myWizardCoat = myWizard.querySelector('.wizard-coat');
var myWizardEyes = myWizard.querySelector('.wizard-eyes');
var myWizardFierBall = myWizard.querySelector('.setup-fireball-wrap');
// Валидация
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
  document.removeEventListener('keydown', onPopupEscPress);
});
userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});
// Работа с меню
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});
// Работа с стилизацией мага
myWizardCoat.addEventListener('click', function () {
  var thisCoatColor = coatColor[getRandomFromArr(coatColor)];
  myWizardCoat.style = 'fill:' + thisCoatColor;
  myWizard.querySelector('[name="coat-color"]').value = thisCoatColor;
});
myWizardEyes.addEventListener('click', function () {
  var thisEyesColor = eyesColor[getRandomFromArr(eyesColor)];
  myWizardEyes.style = 'fill:' + thisEyesColor;
  myWizard.querySelector('[name="eyes-color"]').value = thisEyesColor;
});
myWizardFierBall.addEventListener('click', function () {
  var thisFierballColor = fierballColor[getRandomFromArr(fierballColor)];
  myWizardFierBall.style = 'background-color:' + thisFierballColor;
  myWizard.querySelector('[name="fireball-color"]').value = thisFierballColor;
});
