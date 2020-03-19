'use strict';

(function () {
  var map = document.querySelector('.map');
  var markersBlock = map.querySelector('.map__pins');
  var pin = map.querySelector('.map__pin');
  var markersTemplate = document.querySelector('#pin').content;
  var locationXMax = map.offsetWidth - 25;

  var fragment = document.createDocumentFragment();

  var cards = [];

  var HEIGTH_PIN = 70;
  var HALF_WIDTH_PIN = 25;

  var CARDS_LENGTH = 8;
  var CARDS_TITLES = [
    'Заголовок 1',
    'Заголовок 2',
    'Заголовок 3',
    'Заголовок 4',
    'Заголовок 5',
    'Заголовок 6',
    'Заголовок 7',
    'Заголовок 8'
  ];
  var CARDS_ADDRESS = [
    '{{location.x}}, {{location.y}}',
    '{{location.x}}, {{location.y}}',
    '{{location.x}}, {{location.y}}',
    '{{location.x}}, {{location.y}}',
    '{{location.x}}, {{location.y}}',
    '{{location.x}}, {{location.y}}',
    '{{location.x}}, {{location.y}}',
    '{{location.x}}, {{location.y}}'
  ];

  var CARDS_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var CARDS_PRICES_MIN = 1;
  var CARDS_PRICES_MAX = 10;

  var CARDS_ROOMS_MIN = 1;
  var CARDS_ROOMS_MAX = 4;

  var CARDS_GUESTS_MIN = 5;
  var CARDS_GUESTS_MAX = 5;

  var CARDS_CHECKIN = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var CARDS_CHECKOUT = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var CARDS_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var CARDS_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var CARDS_LOCATION_X_MIN = 25;
  var CARDS_LOCATION_Y_MIN = 130;
  var CARDS_LOCATION_Y_MAX = 630;

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function getRandomValue(values) {
    return values[Math.floor(Math.random() * values.length)];
  };

  function generateSomeRandomNumbers(min, max, l) {
    var arr = [],
    m = [],
    n = 0;

    if (max - min < l - 1) return;

    for (var i = 0; i <= (max - min); i++) {
      m[i] = i + min;
    }

    for (var i = 0; i < l; i++) {
      n = Math.floor(Math.random() * (m.length));
      arr[i] = m.splice(n, 1);
    };

    return arr;
  }

  function generationSomeRandomText(values) {
    var maxLength = getRandomArbitrary(1, values.length);
    var numbers = generateSomeRandomNumbers(1, values.length, maxLength);
    var list = [];

    for (var i =  0; i < numbers.length; i++) {
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
    cards.push(
      {
        "author": {
          "avatar": 'img/avatars/user' + generationAvatars(i + 1) + '.png'
        },

        "offer": {
          "title": CARDS_TITLES[i],
          "address": CARDS_ADDRESS[i],
          "price": getRandomArbitrary(CARDS_PRICES_MIN, CARDS_PRICES_MAX),
          "type": getRandomValue(CARDS_TYPES),
          "rooms": getRandomArbitrary(CARDS_ROOMS_MIN, CARDS_ROOMS_MAX),
          "guests": getRandomArbitrary(CARDS_ROOMS_MIN, CARDS_ROOMS_MAX),
          "checkin": getRandomValue(CARDS_CHECKIN),
          "checkout": getRandomValue(CARDS_CHECKOUT),
          "features": generationSomeRandomText(CARDS_FEATURES),
          "description": getRandomArbitrary(CARDS_LOCATION_X_MIN, locationXMax) + ', ' + getRandomArbitrary(CARDS_LOCATION_Y_MIN, CARDS_LOCATION_Y_MAX),
          "photos": generationSomeRandomText(CARDS_PHOTOS)
        },

      "location": {
        "x": getRandomArbitrary(CARDS_LOCATION_X_MIN, locationXMax),
        "y": getRandomArbitrary(CARDS_LOCATION_Y_MIN, CARDS_LOCATION_Y_MAX)
        }
      }
    );
  }

  function createMarks(mark) {
    var clone = pin.cloneNode(true);

    clone.querySelector('img').src = mark.author.avatar;
    clone.querySelector('img').alt = mark.offer.title;
    clone.style.left = (mark.location.x - HALF_WIDTH_PIN) + 'px';
    clone.style.top = (mark.location.y - HEIGTH_PIN) + 'px';

    return clone;
  }

  for (var i = 0; i < CARDS_LENGTH; i++) {
    createCard(i);
  }

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(createMarks(cards[i]));
  }

  markersBlock.appendChild(fragment);

  map.classList.remove('map--faded');
})();
