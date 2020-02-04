import '../pages/index.css'
import Api from './Api';
import Card from './Card';
import CardList from './CardList';
import FormPopup from './FormPopup';
import PicPopup from './PicPopup';
import Validator from './Validator';
import validErrors from './validErrors';

export { cards, root, userName, userJob, userAvatar, userInfoName, userInfoJob, cardList, options, api};

const cards = document.querySelector('.places-list');
const root = document.querySelector('.root');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const cardList = new CardList(cards);
const options = {
      baseUrl: 'https://95.216.175.5/cohort5',
      token: '986ab668-9bd3-4a24-aab1-bd07b4c0a5f9',
      groupId: 'cohort5'
};
const api = new Api(options);
const popupAppear = function(event) {
      let btnValue = event.target.classList;
      if (btnValue.contains('user-info__btn')) {
            const popup = new FormPopup;
            popup.render(btnValue);
      }
};

root.addEventListener('click', popupAppear);

api.setUserInfo();
api.getInitialCards();
