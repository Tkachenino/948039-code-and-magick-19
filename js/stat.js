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
  shadow: 'rgba(0, 0, 0, 0.7)',
  white: '#fff',
  black: '#000',
  red: 'rgba(255, 0, 0, 1)'
};
var shodowCloudX = CLOUD_X + GAPS;
var shodowCloudY = CLOUD_Y + GAPS;
var getBarPositionOnX = function (index) {
  return CLOUD_X + BAR_SPACE + (BAR_SPACE + BAR_WIDTH) * index;
};
var getNamesPositionOnY = function () {
  return CLOUD_Y + GAPS * 6 + FONT_GAP * 2 + MAX_BAR_HEIGHT;
};
var getBarPositionOnY = function () {
  return CLOUD_Y + GAPS * 6 + FONT_GAP + MAX_BAR_HEIGHT;
};
var getSocersPositionOnY = function (playersTime, maxTime) {
  return CLOUD_Y + GAPS * 5 + FONT_GAP + MAX_BAR_HEIGHT - (MAX_BAR_HEIGHT * playersTime) / maxTime;
};
var getCorrectHeightBar = function (playersTime, maxTime) {
  return -(MAX_BAR_HEIGHT * playersTime) / maxTime;
};
//  определяем функцию генерации облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
  //  определяем max элемент массива arr
var getMaxElement = function (array) {
  return Math.max.apply(null, array);
};
//  генерируем рандомное значение насыщенности
var getRandom = function () {
  return Math.round(Math.random() * 100);
};
// определяем функцию генерации графика статистики
var buildGraph = function (ctx, nameOfPlayer, timesArray, index) {
  ctx.fillStyle = COLOR_PALITRA.black;
  ctx.fillText(nameOfPlayer, getBarPositionOnX(index), getNamesPositionOnY());
  if (nameOfPlayer === 'Вы') {
    ctx.fillStyle = COLOR_PALITRA.red;
  } else {
    ctx.fillStyle = 'hsl(240,  ' + getRandom() + '%, 46%)';
  }
  var maxTime = getMaxElement(timesArray);
  ctx.fillRect(getBarPositionOnX(index), getBarPositionOnY(), BAR_WIDTH, getCorrectHeightBar(timesArray[index], maxTime));
  //  выводим огругленные результаты
  ctx.fillStyle = COLOR_PALITRA.black;
  var roundTimes = timesArray.map(Math.round);
  ctx.fillText(roundTimes[index], getBarPositionOnX(index), getSocersPositionOnY(timesArray[index], maxTime));
};
//  запуск генерации окна статистики
window.renderStatistics = function (ctx, names, times) {
  //  определяем фон
  renderCloud(ctx, shodowCloudX, shodowCloudY, COLOR_PALITRA.shadow);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_PALITRA.white);
  //  определяем положение вступительного приветсвия
  ctx.fillStyle = COLOR_PALITRA.black;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', GRETTING_GAPS_X, GRETTING_GAPS_Y);
  ctx.fillText('Список результатов:', GRETTING_GAPS_X, GRETTING_GAPS_Y + FONT_GAP);
  //  генерируем график с данными игры
  for (var i = 0; i < times.length; i++) {
    buildGraph(ctx, names[i], times, i);
  }
};
