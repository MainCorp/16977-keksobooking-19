'use strict';

(function () {
  var getRandomArbitrary = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  var getRandomValue = function (values) {
    return values[Math.floor(Math.random() * values.length)];
  };

  var generateSomeRandomNumbers = function (min, max, l) {
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
  };

  var generationSomeRandomText = function (values) {
    var maxLength = getRandomArbitrary(1, values.length);
    var numbers = generateSomeRandomNumbers(1, values.length, maxLength);
    var list = [];

    for (var i = 0; i < numbers.length; i++) {
      list.push(values[numbers[i][0] - 1]);
    }
    return list;
  };

  var generationAvatars = function (num) {
    var value = [];

    if (String(num).length < 2) {
      value.push('0' + num);
    } else {
      value.push(num);
    }

    return value;
  };

  var addStateElements = function (container, elements, attr, state) {
    var fields = container.querySelectorAll(elements);

    if (fields) {
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];

        field.setAttribute(attr, state);
      }
    }
  };

  var removeStateElements = function (container, elements, attr) {
    var fields = container.querySelectorAll(elements);

    if (fields) {
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];

        field.removeAttribute(attr);
      }
    }
  };

  var findCenterElement = function (element) {
    var left = element.offsetLeft;
    var top = element.offsetTop;
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    var coordX = top - (height / 2);
    var coordY = left - (width / 2);

    return [coordX, coordY];
  };

  window.utils = {
    getRandomArbitrary: getRandomArbitrary,
    getRandomValue: getRandomValue,
    generateSomeRandomNumbers: generateSomeRandomNumbers,
    generationSomeRandomText: generationSomeRandomText,
    generationAvatars: generationAvatars,
    addStateElements: addStateElements,
    removeStateElements: removeStateElements,
    findCenterElement: findCenterElement,
  }
})();
