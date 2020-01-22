'use strict';

window.renderStatistics = function (ctx, names, times) {
//  определяем тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
//  определяем холст
  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);
//  определяем положение текста
ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 110, 50);
  ctx.fillText('Список результатов:', 110, 50+16);
};
