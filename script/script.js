const cards = document.querySelector('.places-list');
const root = document.querySelector('.root');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const cardList = new CardList(cards);
const options = {
      baseUrl: 'http://95.216.175.5/cohort5',
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



/**

* Можно лучше все addEventListener надо отделять от реализации. В данном случае это является не ллучшей практикой.
--наподобие этого:
--
--root.addEventListener('click', function (event) {
--      let btnValue = event.target.classList;
--      if (btnValue.contains('user-info__btn')) {
--            const popup = new FormPopup;
--            popup.render(btnValue);
--      }
--})
--
--Нужно сделать так?:
--const popupAppear = function(event) {
--      let btnValue = event.target.classList;
--      if (btnValue.contains('user-info__btn')) {
--            const popup = new FormPopup;
--            popup.render(btnValue);
--}
--root.addEventListener('click', popupAppear);
--
--И соответственно, везде так сделать?

*
* Нехватает комментариев к классам, хотя бы пару слов

--Какого рода комментарии нужны? Добавил в паре мест. А так, вроде бы, стараюсь называть методы так, чтобы, исходя из названия, было ясно, для чего они.

*
*/


/**
 * Здравствуйте.
 *
 * можно лучше В классе FormPopup я бы разнёс шаблоны по разным методам. Очень тяжело воспринимать всё в одном методе
 *
 * Класс Api: Класс ничего не должен знать о реализации. Сейчас класс у вас может поменять изображение
 *                 userName.textContent = data.name;
                userJob.textContent = data.about;
                userAvatar.setAttribute('style', `background-image: url(${data.avatar})`);
 * или вызвать другой метод класса
 * cardList.render(obj);
 * Если произвести параллели с реальной жизнью, можно представить автомобиль(класс API), который привёз посудомоечную машину в квартиру
 * ну и за одно загрузил туда посуду и помыл.
 * Решение, отдавать данные через return или callback
 * Класс API ничего не должен знать о том кто будет обрабатывать результаты
 *
 * --И соответственно, везде так сделать?
 * - ДА
 *
 * класс API можно передать в другой класс в качестве параметров(это называется инъекция, хорошая практика) и там вызывать
 * api.setUserInfo();
 * api.getInitialCards();
 * с класс вызывать методы API а потом в классе образатывать результа
 *
 * Свои замечания не считаю критичными, поэтому работу принимаю. Вы молодец и жду Вас в следующем спринте
 *
 * @koras
 *
 *
 */