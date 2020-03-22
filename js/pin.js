'use strict';

(function () {
  var mainMark = document.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var fieldAddress = advertForm.querySelector('#address');
  var overlay = document.querySelector('.map__overlay');
  var markersTemplate = document.querySelector('#pin').content;
  var constants = window.constants;

  var overlaySizes = {
    x: overlay.offsetWidth,
    y: overlay.offsetHeight
  };

  var pinSizes = {
    x: mainMark.offsetWidth,
    y: mainMark.offsetHeight
  };

  var isOverlayTop = overlaySizes.y - pinSizes.y - constants.POINT_HEIGHT;
  var isOverlayLeft = overlaySizes.x - pinSizes.x;

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


  var setMove = function () {
    mainMark.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var handlerMoveMark = function (evtMove) {
        evtMove.preventDefault();

        var moveCoords = {
          x: evtMove.clientX,
          y: evtMove.clientY
        };

        var shift = {
          x: startCoords.x - moveCoords.x,
          y: startCoords.y - moveCoords.y
        };

        startCoords.x = moveCoords.x;
        startCoords.y = moveCoords.y;

        var currentPoint = {
          x: mainMark.offsetLeft - shift.x,
          y: mainMark.offsetTop - shift.y
        };

        if (currentPoint.x > constants.POINT_WIDTH && currentPoint.x <= isOverlayLeft) {
          mainMark.style.left = currentPoint.x + 'px';
        }

        if (currentPoint.y > constants.POINT_HEIGHT && currentPoint.y <= isOverlayTop) {
          mainMark.style.top = currentPoint.y + 'px';
        }

        fieldAddress.value = (currentPoint.y - constants.POINT_HEIGHT) + ', ' + (currentPoint.x - constants.POINT_WIDTH);
      };

      var handlerMouseUpMark = function () {
        document.removeEventListener('mousemove', handlerMoveMark);
        document.removeEventListener('mouseup', handlerMouseUpMark);
      };

      document.addEventListener('mousemove', handlerMoveMark);
      document.addEventListener('mouseup', handlerMouseUpMark);
    });
  };

  window.pin = {
    get: createMarks,
    setMove: setMove
  };

  mainMark.style.zIndex = 2;
})();
