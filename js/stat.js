'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAPS = 10;
var BAR_WIDTH = 40;
var BAR_SPACE = 50;
var FONT_GAP = 16;
/* Ввожу функцию для создания рандомного процента
ф-ия выводит рандомное значение от 0 до 1, округляет до 2 знаков и умножнает на 100%
var getRandom = function () {
  return Math.round(Math.random(), 2) *100%;
};

*/

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
  //  определяем max элемент массива arr
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  //  определяем тень
  renderCloud(ctx, CLOUD_X + GAPS, CLOUD_Y + GAPS, 'rgba(0, 0, 0, 0.7)');
  //  определяем холст
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  //  определяем положение текста
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 110, 50);
  ctx.fillText('Список результатов:', 110, 50 + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], 145 + (BAR_SPACE + BAR_WIDTH) * i, 250);
    if (names[i].indexOf('Вы') === 0) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, 83%, 46%)';
    /*  определяем положение текста
     ctx.fillStyle = 'hsl(240, getRandom(), 46%)';
    */
    }
    ctx.fillRect(145 + (BAR_SPACE + BAR_WIDTH) * i, 230, BAR_WIDTH, -(150 * times[i]) / maxTime);
  }
};
