'use strict';

(function () {
  var map = document.querySelector('.map');
  var markersBlock = map.querySelector('.map__pins');
  var markersTemplate = document.querySelector('#pin').content;
  var locationXMax = map.offsetWidth - 25;

  var fragment = document.createDocumentFragment();

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

  for (var i = 0; i < CARDS_LENGTH; i++) {
    createCard(i);
  }

  for (var n = 0; n < cards.length; n++) {
    fragment.appendChild(createMarks(cards[n]));
  }

  markersBlock.appendChild(fragment);

  map.classList.remove('map--faded');
})();
