'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAPS = 10;
var BAR_WIDTH = 40;
var BAR_SPACE = 50;
var FONT_GAP = 16;
var MAX_BAR_HEIGHT = 150;
var COLOR_PALITRA = ['rgba(0, 0, 0, 0.7)', '#fff', '#000', 'rgba(255, 0, 0, 1)'];
var getBarPositionOnX = function (i) {
  return CLOUD_X + BAR_SPACE + (BAR_SPACE + BAR_WIDTH) * i;
};
var getNamesPositionOnY = function () {
  return CLOUD_Y + GAPS * 6 + FONT_GAP * 2 + MAX_BAR_HEIGHT;
};
var getBarPositionOnY = function () {
  return CLOUD_Y + GAPS * 6 + FONT_GAP + MAX_BAR_HEIGHT;
};
var getSocersPositionOnY = function (arr, maxTime) {
  return CLOUD_Y + GAPS * 5 + FONT_GAP + MAX_BAR_HEIGHT - (MAX_BAR_HEIGHT * arr) / maxTime;
};
//  определяем функцию генерации облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
  //  определяем max элемент массива arr
var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};
//  генерируем рандомное значение насыщенности
var getRandom = function () {
  return Math.round(Math.random() * 100);
};
//  запуск генерации окна статистики
window.renderStatistics = function (ctx, names, times) {
  //  определяем фон
  renderCloud(ctx, CLOUD_X + GAPS, CLOUD_Y + GAPS, COLOR_PALITRA[0]);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_PALITRA[1]);
  //  определяем положение вступительного приветсвия
  ctx.fillStyle = COLOR_PALITRA[2];
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAPS * 3, CLOUD_Y + GAPS * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAPS * 3, CLOUD_Y + GAPS * 3 + FONT_GAP);
  //  генерируем график. с данными игры
  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = COLOR_PALITRA[2];
    ctx.fillText(names[i], getBarPositionOnX(i), getNamesPositionOnY());
    if (names[i] === 'Вы') {
      ctx.fillStyle = COLOR_PALITRA[3];
    } else {
      ctx.fillStyle = 'hsl(240,  ' + getRandom() + '%, 46%)';
    }
    var maxTime = getMaxElement(times);
    ctx.fillRect(getBarPositionOnX(i), getBarPositionOnY(), BAR_WIDTH, -(MAX_BAR_HEIGHT * times[i]) / maxTime);
    //  выводим огругленные результаты
    ctx.fillStyle = COLOR_PALITRA[2];
    var roundTimes = times.map(Math.round);
    ctx.fillText(roundTimes[i], getBarPositionOnX(i), getSocersPositionOnY(times[i], maxTime));

  }
};
