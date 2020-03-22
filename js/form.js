'use strict';

(function () {
  var mainMark = document.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters-container');

  var fieldAddress = advertForm.querySelector('#address');
  var fieldRoomNumber = advertForm.querySelector('#room_number');
  var fieldCapacity = advertForm.querySelector('#capacity');
  var fieldType = advertForm.querySelector('#type');
  var fieldPrice = advertForm.querySelector('#price');
  var fieldTitle = advertForm.querySelector('#title');
  var fieldTimein = advertForm.querySelector('#timein');
  var fieldTimeout = advertForm.querySelector('#timeout');
  var fieldImages = advertForm.querySelector('#images');
  var fieldAvatar = advertForm.querySelector('#avatar');

  var constants = window.constants;
  var utils = window.utils;

  var validateOptions = function (select, options, visibleOptions, activeElement) {
    for (var i = 0; i < visibleOptions.length; i++) {
      visibleOptions[i].removeAttribute('hidden');
    }

    if (activeElement) {
      select.value = activeElement.value;

      select.addEventListener('change', handlerCheckSelect);
    }
  };

  var validateForm = function () {
    if (fieldRoomNumber && fieldCapacity) {
      var rooms = Number(fieldRoomNumber.value);

      var options = fieldCapacity.options;
      var optionNotForGuests = fieldCapacity.querySelector('option[value="0"]');
      var optionForOneGuest = fieldCapacity.querySelector('option[value="1"]');
      var optionForTwoGuests = fieldCapacity.querySelector('option[value="2"]');
      var optionForThreeGuests = fieldCapacity.querySelector('option[value="3"]');

      for (var i = 0; i < options.length; i++) {
        options[i].hidden = 'true';
      }

      if (rooms === 1) {
        validateOptions(fieldCapacity, options, [optionForOneGuest], optionForOneGuest);
      } else if (rooms === 2) {
        validateOptions(fieldCapacity, options, [optionForOneGuest, optionForTwoGuests], optionForTwoGuests);
      } else if (rooms === 3) {
        validateOptions(fieldCapacity, options, [optionForOneGuest, optionForTwoGuests, optionForThreeGuests], optionForThreeGuests);
      } else if (rooms === 100) {
        validateOptions(fieldCapacity, options, [optionNotForGuests], optionNotForGuests);
      }
    }

    if (fieldTitle) {
      if (fieldTitle.value.length > constants.TITLE_MAX_LENGTH) {
        fieldTitle.setCustomValidity('Заголовок не должен быть длиннее ' + constants.TITLE_MAX_LENGTH + ' символов');
      } else if (fieldTitle.value.length < constants.TITLE_MIN_LENGTH) {
        fieldTitle.setCustomValidity('Заголовок не должен быть короче ' + constants.TITLE_MIN_LENGTH + ' символов');
      } else {
        fieldTitle.setCustomValidity('');
      }
    }

    if (fieldPrice) {
      if (Number(fieldPrice.value) > constants.MAX_PRICE) {
        fieldPrice.setCustomValidity('Максимально допустимая цена за ночь это ' + constants.MAX_PRICE + ' рублей');
      } else if (fieldPrice.validity.badInput) {
        fieldPrice.setCustomValidity('Укажите пожалуйста цену в цифрах');
      } else {
        fieldPrice.setCustomValidity('');
      }
    }

    if (fieldType && fieldPrice) {
      switch (fieldType.value) {
        case 'bungalo':
          fieldPrice.min = 0;
          fieldPrice.placeholder = 'Мин. 0руб.';
          break;

        case 'flat':
          fieldPrice.min = 1000;
          fieldPrice.placeholder = 'Мин. 1000руб.';
          break;

        case 'house':
          fieldPrice.min = 5000;
          fieldPrice.placeholder = 'Мин. 5000руб.';
          break;

        case 'palace':
          fieldPrice.min = 10000;
          fieldPrice.placeholder = 'Мин. 10000руб.';
          break;
      }
    }
  };

  var disabledForm = function () {
    utils.addStateElements(advertForm, 'input', 'disabled', true);
    utils.addStateElements(advertForm, 'select', 'disabled', true);
    utils.addStateElements(advertForm, 'textarea', 'disabled', true);
    utils.addStateElements(advertForm, 'button', 'disabled', true);

    utils.addStateElements(mapFilters, 'input', 'disabled', true);
    utils.addStateElements(mapFilters, 'select', 'disabled', true);
    utils.addStateElements(mapFilters, 'textarea', 'disabled', true);
  };

  var addDefaultAddressCords = function () {
    var coords = utils.findCenterElement(mainMark);
    var x = Math.round(coords[0]);
    var y = Math.round(coords[1]);

    if (fieldAddress) {
      fieldAddress.value = x + ', ' + y;
    }
  };

  var addActiveAddressCords = function () {
    var coords = utils.findCenterElement(mainMark);
    var x = Math.round(coords[0] + constants.POINT_WIDTH);
    var y = Math.round(coords[1] + constants.POINT_HEIGHT);

    if (fieldAddress) {
      fieldAddress.value = x + ', ' + y;
    }
  };

  var handlerCheckSelect = function (evt) {
    evt.stopPropagation();

    var target = evt.target;
    var index = target.selectedIndex;

    target.value = target.options[index].value;

    target.removeEventListener('change', handlerCheckSelect);
  };

  var handlerValidateForm = function () {
    validateForm();
  };

  var handlerValidateImages = function (evt) {
    var isImage = evt.target.files[0];

    if (isImage) {
      var type = isImage.type.split('/')[0];

      if (type !== 'image') {
        evt.target.value = '';
      }
    }
  };

  fieldAddress.readOnly = true;

  window.form = {
    validateOptions: validateOptions,
    validateForm: validateForm,
    disabledForm: disabledForm,
    addDefaultAddressCords: addDefaultAddressCords,
    addActiveAddressCords: addActiveAddressCords,

    handlers: {
      checkSelect: handlerCheckSelect,
      validateForm: handlerValidateForm,
      validateImages: handlerValidateImages
    }
  };

  advertForm.addEventListener('change', handlerValidateForm);

  fieldTimein.addEventListener('change', function () {
    fieldTimeout.value = fieldTimein.value;
  });

  fieldTimeout.addEventListener('change', function () {
    fieldTimein.value = fieldTimeout.value;
  });

  fieldImages.addEventListener('change', handlerValidateImages);

  fieldAvatar.addEventListener('change', handlerValidateImages);
})();
