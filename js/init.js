'use strict';

(function () {
  var map = document.querySelector('.map');
  var markersBlock = map.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();
  var advertForm = document.querySelector('.ad-form');
  var mainMark = document.querySelector('.map__pin--main');

  var popup = window.popup;
  var form = window.form;
  var data = window.data;
  var constants = window.constants;
  var pin = window.pin;
  var utils = window.utils;

  function disabledPage() {
    form.addDefaultAddressCords();
    form.disabledForm();
    form.validateForm();
  }

  var initCards = function () {
    var cards = data.getCards(constants.CARDS_LENGTH);

    for (var n = 0; n < cards.length; n++) {
      fragment.appendChild(pin.get(cards[n], n));
    }

    markersBlock.appendChild(fragment);

    initPopup(markersBlock);
  };

  var initPopup = function (btnContainer) {
    var btns = btnContainer.querySelectorAll('button');

    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];

      if (btn.classList.contains('map__pin--main') === false) {
        btn.addEventListener('mousedown', showModals);
        btn.addEventListener('keydown', showModals);
      }
    }
  };

  var initMap = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      map.classList.remove('map--faded');
      advertForm.classList.remove('ad-form--disabled');

      utils.removeStateElements(advertForm, 'input', 'disabled');
      utils.removeStateElements(advertForm, 'select', 'disabled');
      utils.removeStateElements(advertForm, 'textarea', 'disabled');
      utils.removeStateElements(advertForm, 'button', 'disabled');

      utils.removeStateElements(filtersContainer, 'input', 'disabled');
      utils.removeStateElements(filtersContainer, 'select', 'disabled');
      utils.removeStateElements(filtersContainer, 'textarea', 'disabled');

      initCards();
      form.addActiveAddressCords();
      pin.setMove();

      mainMark.removeEventListener('mousedown', initMap);
      mainMark.removeEventListener('keydown', initMap);
    }
  };

  var showModals = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      var target = evt.target;
      var tag = target.tagName;
      var num = target.offsetParent.dataset.numBtn;

      if (tag === 'BUTTON') {
        num = target.dataset.numBtn;
      }

      popup.delete();

      map.insertBefore(popup.get(data.getCards(constants.CARDS_LENGTH)[num]), filtersContainer);
    }
  };

  var closeModal = function (evt) {
    var closeBtn = evt.target.classList.contains('popup__close');

    if (evt.key === 'Escape') {
      popup.delete();
    }

    if (closeBtn) {
      popup.delete();
    }
  };

  window.init = {
    disabledPage: disabledPage,
    initCards: initCards,
    initPopup: initPopup,

    handlers: {
      closeModal: closeModal,
      showModals: showModals,
      initMap: initMap
    }
  };


})();
