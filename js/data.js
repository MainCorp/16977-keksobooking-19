'use strict';

(function() {
  var map = document.querySelector('.map');
  var locationXMax = map.offsetWidth - 25;

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

  var getCards = function (count) {
    var cards = [];

    for (var i = 0; i < count; i++) {
      cards.push({
        'author': {
          'avatar': 'img/avatars/user' + utils.generationAvatars(i + 1) + '.png'
        },

        'offer': {
          'title': cardsTitles[i],
          'address': utils.getRandomArbitrary(constants.CARDS_LOCATION_X_MIN, locationXMax) + ', ' + utils.getRandomArbitrary(constants.CARDS_LOCATION_Y_MIN, constants.CARDS_LOCATION_Y_MAX),
          'price': utils.getRandomArbitrary(constants.CARDS_PRICES_MIN, constants.CARDS_PRICES_MAX),
          'type': utils.getRandomValue(cardsTypes),
          'rooms': utils.getRandomArbitrary(constants.CARDS_ROOMS_MIN, constants.CARDS_ROOMS_MAX),
          'guests': utils.getRandomArbitrary(constants.CARDS_GUESTS_MIN, constants.CARDS_GUESTS_MAX),
          'checkin': utils.getRandomValue(cardsCheckin),
          'checkout': utils.getRandomValue(cardsCheckout),
          'features': utils.generationSomeRandomText(cardsFeatures),
          'description': cardsDescriptions[i],
          'photos': utils.generationSomeRandomText(cardsPhotos)
        },

        'location': {
          'x': utils.getRandomArbitrary(constants.CARDS_LOCATION_X_MIN, locationXMax),
          'y': utils.getRandomArbitrary(constants.CARDS_LOCATION_Y_MIN, constants.CARDS_LOCATION_Y_MAX)
        }
      });
    }

    return cards;
  };

  window.data = {
    getCards: getCards
  }
})();
