'use strict';

(function () {
  var mainMark = document.querySelector('.map__pin--main');
  var init = window.init;

  init.disabledPage();

  mainMark.addEventListener('mousedown', init.handlers.initMap);
  mainMark.addEventListener('keydown', init.handlers.initMap);

  document.addEventListener('keydown', init.handlers.closeModal);
  document.addEventListener('click', init.handlers.closeModal);
})();
