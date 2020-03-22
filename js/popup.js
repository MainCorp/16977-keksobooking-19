'use strict';

(function () {
  var createPopup = function (mark) {
    var popupTemplate = document.querySelector('#card').content.querySelector('.map__card');
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
  };

  var deleteModals = function () {
    var modals = document.querySelectorAll('.map__card');

    if (modals.length > 0) {
      for (var i = 0; i < modals.length; i++) {
        modals[i].remove();
      }
    }
  };

  window.popup = {
    get: createPopup,
    delete: deleteModals
  }
})();
