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
var GRETTING_GAPS_X = CLOUD_X + GAPS * 3;
var GRETTING_GAPS_Y = CLOUD_Y + GAPS * 3;
var COLOR_PALITRA = {
  SHADOW: 'rgba(0, 0, 0, 0.7)',
  WHITE: '#fff',
  BLACK: '#000',
  RED: 'rgba(255, 0, 0, 1)'
};
var shodowCloudX = CLOUD_X + GAPS;
var shodowCloudY = CLOUD_Y + GAPS;
var getBarPositionOnX = function (numberBar) {
  return CLOUD_X + BAR_SPACE + (BAR_SPACE + BAR_WIDTH) * numberBar;
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
var getCorrectHeightBar = function (arr, maxTime) {
  return -(MAX_BAR_HEIGHT * arr) / maxTime;
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
// определяем функцию генерации графика статистики
var buildGraph = function (ctx, arr1, arr2, numberOfBar) {
  ctx.fillStyle = COLOR_PALITRA.BLACK;
  ctx.fillText(arr1, getBarPositionOnX(numberOfBar), getNamesPositionOnY());
  if (arr1 === 'Вы') {
    ctx.fillStyle = COLOR_PALITRA.RED;
  } else {
    ctx.fillStyle = 'hsl(240,  ' + getRandom() + '%, 46%)';
  }
  var maxTime = getMaxElement(arr2);
  ctx.fillRect(getBarPositionOnX(numberOfBar), getBarPositionOnY(), BAR_WIDTH, getCorrectHeightBar(arr2[numberOfBar], maxTime));
  //  выводим огругленные результаты
  ctx.fillStyle = COLOR_PALITRA.BLACK;
  var roundTimes = arr2.map(Math.round);
  ctx.fillText(roundTimes[numberOfBar], getBarPositionOnX(numberOfBar), getSocersPositionOnY(arr2[numberOfBar], maxTime));
};
//  запуск генерации окна статистики
window.renderStatistics = function (ctx, names, times) {
  //  определяем фон
  renderCloud(ctx, shodowCloudX, shodowCloudY, COLOR_PALITRA.SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_PALITRA.WHITE);
  //  определяем положение вступительного приветсвия
  ctx.fillStyle = COLOR_PALITRA.BLACK;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', GRETTING_GAPS_X, GRETTING_GAPS_Y);
  ctx.fillText('Список результатов:', GRETTING_GAPS_X, GRETTING_GAPS_Y + FONT_GAP);
  //  генерируем график с данными игры
  for (var i = 0; i < times.length; i++) {
    this.buildGraph(ctx, names[i], times, i);
  }
};
