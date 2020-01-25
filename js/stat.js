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
//  определяем функцию генерации облака
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
  //  запуск генерации окна статистики
window.renderStatistics = function (ctx, names, times) {
  //  определяем тень
  renderCloud(ctx, CLOUD_X + GAPS, CLOUD_Y + GAPS, 'rgba(0, 0, 0, 0.7)');
  //  определяем холст
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  //  определяем положение вступительного приветсвия
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAPS * 3, CLOUD_Y + GAPS * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAPS * 3, CLOUD_Y + GAPS * 3 + FONT_GAP);
  //  генерируем график. с данными игры
  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_SPACE + (BAR_SPACE + BAR_WIDTH) * i, CLOUD_Y + GAPS * 6 + FONT_GAP * 2 + MAX_BAR_HEIGHT);
    if (names[i].indexOf('Вы') === 0) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      //  генерируем рандомное значение насыщенности
      var getRandom = function () {
        return Math.round(Math.random() * 100);
      };
      ctx.fillStyle = 'hsl(240,  ' + getRandom() + '%, 46%)';
    }
    var maxTime = getMaxElement(times);
    ctx.fillRect(CLOUD_X + BAR_SPACE + (BAR_SPACE + BAR_WIDTH) * i, CLOUD_Y + GAPS * 6 + FONT_GAP + MAX_BAR_HEIGHT, BAR_WIDTH, -(MAX_BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    //  генерируем функция округления времени
    var roundTimes = [];
    var getRoundTimes = function () {
      for (var j = 0; j < times.length; j++) {
        roundTimes[j] = Math.round(times[j]);
      }
      return roundTimes;
    };
    getRoundTimes();
    ctx.fillText(roundTimes[i], CLOUD_X + BAR_SPACE + (BAR_SPACE + BAR_WIDTH) * i, CLOUD_Y + GAPS * 5 + FONT_GAP + MAX_BAR_HEIGHT - (MAX_BAR_HEIGHT * times[i]) / maxTime);
  }
};
