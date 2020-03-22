'use strict';

(function () {
  var markersTemplate = document.querySelector('#pin').content;

  var createMarks = function (mark, num) {
    var clone = markersTemplate.cloneNode(true);
    var btn = clone.querySelector('.map__pin');

    btn.querySelector('img').src = mark.author.avatar;
    btn.querySelector('img').alt = mark.offer.title;
    btn.style.left = (mark.location.x - constants.HALF_WIDTH_PIN) + 'px';
    btn.style.top = (mark.location.y - constants.HEIGTH_PIN) + 'px';

    btn.setAttribute('data-num-btn', num);

    return btn;
  };

  window.pin = {
    get: createMarks
  }
})();
