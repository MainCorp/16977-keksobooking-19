'use strict';

(function () {
  var map = document.querySelector('.map');
  var markersBlock = map.querySelector('.map__pins');
  var markersTemplate = document.querySelector('#pin').content;
  var locationXMax = map.offsetWidth - 25;

  var fragment = document.createDocumentFragment();

  var popupTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = map.querySelector('.map__filters-container');

  var advertForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters-container');

  var mainMark = document.querySelector('.map__pin--main');

  var fieldAddress = document.querySelector('#address');
  var fieldRoomNumber = document.querySelector('#room_number');
  var fieldCapacity = document.querySelector('#capacity');

  var cards = [];

  var cardsTitles = [
    'Заголовок 1',
    'Заголовок 2',
    'Заголовок 3',
    'Заголовок 4',
    'Заголовок 5',
    'Заголовок 6',
    'Заголовок 7',
    'Заголовок 8'
  ];

  var cardsTypes = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var cardsCheckin = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var cardsDescriptions = [
    'Описание 1',
    'Описание 2',
    'Описание 3',
    'Описание 4',
    'Описание 5',
    'Описание 6',
    'Описание 7',
    'Описание 8'
  ];

  var cardsPhotos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var cardsFeatures = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var cardsCheckout = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var HEIGTH_PIN = 70;
  var HALF_WIDTH_PIN = 25;

  var CARDS_LENGTH = 8;

  var CARDS_PRICES_MIN = 1;
  var CARDS_PRICES_MAX = 10;

  var CARDS_ROOMS_MIN = 1;
  var CARDS_ROOMS_MAX = 4;

  var CARDS_GUESTS_MIN = 1;
  var CARDS_GUESTS_MAX = 5;

  var CARDS_LOCATION_X_MIN = 25;
  var CARDS_LOCATION_Y_MIN = 130;
  var CARDS_LOCATION_Y_MAX = 630;

  var POINT_HEIGHT = 22;
  var POINT_WIDTH = 10;

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function getRandomValue(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function generateSomeRandomNumbers(min, max, l) {
    var arr = [];
    var m = [];
    var n = 0;

    if (max - min < l - 1) {
      return false;
    }

    for (var i = 0; i <= (max - min); i++) {
      m[i] = i + min;
    }

    for (var j = 0; j < l; j++) {
      n = Math.floor(Math.random() * (m.length));
      arr[j] = m.splice(n, 1);
    }

    return arr;
  }

  function generationSomeRandomText(values) {
    var maxLength = getRandomArbitrary(1, values.length);
    var numbers = generateSomeRandomNumbers(1, values.length, maxLength);
    var list = [];

    for (var i = 0; i < numbers.length; i++) {
      list.push(values[numbers[i][0] - 1]);
    }

    return list;
  }

  function generationAvatars(num) {
    var value = [];

    if (String(num).length < 2) {
      value.push('0' + num);
    } else {
      value.push(num);
    }

    return value;
  }

  function createCard(i) {
    cards.push({
      'author': {
        'avatar': 'img/avatars/user' + generationAvatars(i + 1) + '.png'
      },

      'offer': {
        'title': cardsTitles[i],
        'address': getRandomArbitrary(CARDS_LOCATION_X_MIN, locationXMax) + ', ' + getRandomArbitrary(CARDS_LOCATION_Y_MIN, CARDS_LOCATION_Y_MAX),
        'price': getRandomArbitrary(CARDS_PRICES_MIN, CARDS_PRICES_MAX),
        'type': getRandomValue(cardsTypes),
        'rooms': getRandomArbitrary(CARDS_ROOMS_MIN, CARDS_ROOMS_MAX),
        'guests': getRandomArbitrary(CARDS_GUESTS_MIN, CARDS_GUESTS_MAX),
        'checkin': getRandomValue(cardsCheckin),
        'checkout': getRandomValue(cardsCheckout),
        'features': generationSomeRandomText(cardsFeatures),
        'description': cardsDescriptions[i],
        'photos': generationSomeRandomText(cardsPhotos)
      },

      'location': {
        'x': getRandomArbitrary(CARDS_LOCATION_X_MIN, locationXMax),
        'y': getRandomArbitrary(CARDS_LOCATION_Y_MIN, CARDS_LOCATION_Y_MAX)
      }
    });
  }

  function createMarks(mark) {
    var clone = markersTemplate.cloneNode(true);
    var btn = clone.querySelector('.map__pin');

    btn.querySelector('img').src = mark.author.avatar;
    btn.querySelector('img').alt = mark.offer.title;
    btn.style.left = (mark.location.x - HALF_WIDTH_PIN) + 'px';
    btn.style.top = (mark.location.y - HEIGTH_PIN) + 'px';

    return btn;
  }

  function createPopup(mark) {
    var popup = popupTemplate.cloneNode(true);

    var popupAvatar = popup.querySelector('.popup__avatar');
    var popupTitle = popup.querySelector('.popup__title');
    var popupAddress = popup.querySelector('.popup__text--address');
    var popupPrice = popup.querySelector('.popup__text--price');
    var popupType = popup.querySelector('.popup__type');
    var popupCapacity = popup.querySelector('.popup__text--capacity');
    var popupTime = popup.querySelector('.popup__text--time');
    var popupFeatureList = popup.querySelector('.popup__features');
    var popupFeatureItem = popup.querySelectorAll('.popup__feature');
    var popupDescription = popup.querySelector('.popup__description');
    var popupPhotosBlock = popup.querySelector('.popup__photos');
    var popupPhoto = popupPhotosBlock.querySelector('.popup__photo');
    var houseType = '';
    var roomText = ' комната';
    var guestsText = ' гостей';

    var popupWifiIcon = popup.querySelector('.popup__feature--wifi');
    var popupDishwasherIcon = popup.querySelector('.popup__feature--dishwasher');
    var popupParkingIcon = popup.querySelector('.popup__feature--parking');
    var popupWasherIcon = popup.querySelector('.popup__feature--washer');
    var popupeLevatorIcon = popup.querySelector('.popup__feature--elevator');
    var popupConditionerIcon = popup.querySelector('.popup__feature--conditioner');

    popupAvatar.src = mark.author.avatar;
    popupTitle.textContent = mark.offer.title;
    popupAddress.textContent = mark.offer.address;
    popupType.textContent = mark.offer.type;
    popupPrice.textContent = mark.offer.price + '₽/ночь';
    popupTime.textContent = 'Заезд после ' + mark.offer.checkin + ', выезд до ' + mark.offer.checkout;
    popupDescription.textContent = mark.offer.description;

    if (mark.offer.type === 'palace') {
      houseType = 'Дворец';
    } else if (mark.offer.type === 'flat') {
      houseType = 'Квартира';
    } else if (mark.offer.type === 'house') {
      houseType = 'Дом';
    } else if (mark.offer.type === 'bungalo') {
      houseType = 'Бунгало';
    }

    popupType.textContent = houseType;

    if (mark.offer.rooms > 1 && mark.offer.rooms < 5) {
      roomText = ' комнаты';
    } else if (mark.offer.rooms >= 5) {
      roomText = ' комнат';
    }

    if (mark.offer.guests === 1) {
      guestsText = ' гостя';
    }

    popupCapacity.textContent = mark.offer.rooms + roomText + ' для ' + mark.offer.guests + guestsText;

    for (var x = 0; x < popupFeatureItem.length; x++) {
      popupFeatureItem[x].remove();
    }

    for (var y = 0; y < mark.offer.features.length; y++) {

      switch (mark.offer.features[y]) {
        case 'wifi':
          popupFeatureList.append(popupWifiIcon);
          break;

        case 'dishwasher':
          popupFeatureList.append(popupDishwasherIcon);
          break;

        case 'parking':
          popupFeatureList.append(popupParkingIcon);
          break;

        case 'washer':
          popupFeatureList.append(popupWasherIcon);
          break;

        case 'elevator':
          popupFeatureList.append(popupeLevatorIcon);
          break;

        case 'conditioner':
          popupFeatureList.append(popupConditionerIcon);
          break;
      }
    }

    popupPhoto.src = mark.offer.photos[0];

    if (mark.offer.photos.length > 1) {
      for (var j = 1; j < mark.offer.photos.length; j++) {
        var newPopupPhoto = popupPhoto.cloneNode(false);

        popupPhotosBlock.appendChild(newPopupPhoto);

        newPopupPhoto.src = mark.offer.photos[j];
      }
    }
    return popup;
  }

  function initCards() {
    for (var i = 0; i < CARDS_LENGTH; i++) {
      createCard(i);
    }

    for (var n = 0; n < cards.length; n++) {
      fragment.appendChild(createMarks(cards[n]));
    }

    markersBlock.appendChild(fragment);
    map.insertBefore(createPopup(cards[0]), filtersContainer);
  }

  function addStateElements(container, elements, attr, state) {
    var fields = container.querySelectorAll(elements);

    if (fields) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].setAttribute(attr, state);
      }
    }
  }

  function removeStateElements(container, elements, attr) {
    var fields = container.querySelectorAll(elements);

    if (fields) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].removeAttribute(attr);
      }
    }
  }

  function findCenterElement(element) {
    var left = element.offsetLeft;
    var top = element.offsetTop;
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    var coordX = top - (height / 2);
    var coordY = left - (width / 2);

    return [coordX, coordY];
  }

  function disabledForm() {
    addStateElements(advertForm, 'input', 'disabled', true);
    addStateElements(advertForm, 'select', 'disabled', true);
    addStateElements(advertForm, 'textarea', 'disabled', true);
    addStateElements(advertForm, 'button', 'disabled', true);

    addStateElements(mapFilters, 'input', 'disabled', true);
    addStateElements(mapFilters, 'select', 'disabled', true);
    addStateElements(mapFilters, 'textarea', 'disabled', true);
  }

  function addDefaultAddressCords() {
    var coords = findCenterElement(mainMark);
    var x = coords[0];
    var y = coords[1];

    if (fieldAddress) {
      fieldAddress.value = x + ', ' + y;
    }
  }

  function addActiveAddressCords() {
    var coords = findCenterElement(mainMark);
    var x = coords[0] + POINT_WIDTH;
    var y = coords[1] + POINT_HEIGHT;

    if (fieldAddress) {
      fieldAddress.value = x + ', ' + y;
    }
  }

  function disabledPage() {
    addDefaultAddressCords();
    disabledForm();
  }

  function handlerValidateForm() {
    if (fieldRoomNumber && fieldCapacity) {
      var rooms = Number(fieldRoomNumber.value);
      var capacity = Number(fieldCapacity.value);

      if (rooms === 1 && capacity !== 1) {
        fieldRoomNumber.setCustomValidity('В одной комнате может проживать только 1 человек');
      } else if (rooms === 2 && capacity !== 1 && capacity !== 2) {
        fieldRoomNumber.setCustomValidity('В двух комнатах могут проживать только 1 или 2 человека');
      } else if (rooms === 3 && capacity === 0) {
        fieldRoomNumber.setCustomValidity('В трех комнатах могут проживать только 1, 2 или 3 человека');
      } else if (rooms === 100 && capacity !== 0) {
        fieldRoomNumber.setCustomValidity('100 комнат предназначены не для гостей');
      } else {
        fieldRoomNumber.setCustomValidity('');
      }
    }
  }

  function handlerInitMap(evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      map.classList.remove('map--faded');
      advertForm.classList.remove('ad-form--disabled');

      removeStateElements(advertForm, 'input', 'disabled');
      removeStateElements(advertForm, 'select', 'disabled');
      removeStateElements(advertForm, 'textarea', 'disabled');
      removeStateElements(advertForm, 'button', 'disabled');

      removeStateElements(mapFilters, 'input', 'disabled');
      removeStateElements(mapFilters, 'select', 'disabled');
      removeStateElements(mapFilters, 'textarea', 'disabled');

      initCards();
      addActiveAddressCords();

      mainMark.removeEventListener('mousedown', handlerInitMap);
      mainMark.removeEventListener('keydown', handlerInitMap);
    }
  }


  disabledPage();

  mainMark.addEventListener('mousedown', handlerInitMap);
  mainMark.addEventListener('keydown', handlerInitMap);

  advertForm.addEventListener('change', handlerValidateForm);
})();
