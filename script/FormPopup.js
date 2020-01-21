class FormPopup {
    constructor(image, alt) {
        this.popup = null;
        this.close = this.close.bind(this);
    }
    //chosing popup templ according to the type of btn clicked
    template(btnValue) {
        if (btnValue.contains('user-info__button-add')) {
            const templatePopup = `
                <div class="popup popup_add popup_is-opened">
                    <div class="popup__content">
                        <img src="./images/close.svg" alt="" class="popup__close">
                        <h3 class="popup__title">Новое место</h3>
                        <form class="popup__form" name="form">
                            <input type="text" name="input__one" class="popup__input popup__input_type_name" placeholder="Название" required minlength="2" maxlength="30">
                            <p class="popup__error"></p>
                            <input type="url" name="input__two" class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку" required>
                            <p class="popup__error"></p>
                            <button class="button popup__button" disabled>+</button>
                        </form>
                    </div>
                </div>`
            let element = document.createElement('div');
            element.insertAdjacentHTML("beforeend", templatePopup.trim(''));
            return element.firstChild;
        } else if (btnValue.contains('user-info__button-edit')) {
            const templatePopup = `
                <div class="popup popup-edit popup_is-opened">
                    <div class="popup__content">
                        <img src="./images/close.svg" alt="" class="popup__close">
                        <h3 class="popup__title">Редактировать профиль</h3>
                        <form class="popup__form" name="form">
                            <input type="text" name="input__one" class="popup__input popup__input_type_userName" placeholder="Имя" required minlength="2" maxlength="30" value="${userName.textContent}">
                            <p class="popup__error"></p>
                            <input type="text" name="input__two" class="popup__input popup__input_type_job" placeholder="О себе" required minlength="2" maxlength="30" value="${userJob.textContent}">
                            <p class="popup__error"></p>
                            <button class="button popup__button popup__button-edit button_active">Сохранить</button>
                        </form>
                    </div>
                </div>`
            let element = document.createElement('div');
            element.insertAdjacentHTML("beforeend", templatePopup.trim(''));
            return element.firstChild;
        }
    }

    render(btnValue) {
        this.popup = this.template(btnValue);
        document.querySelector('.root').appendChild(this.popup);
        const form = document.forms.form;
        const formInputOne = form.elements.input__one;
        const formInputTwo = form.elements.input__two;
        this.addListeners(formInputOne, formInputTwo);

    }

    addListeners(inputOne, inputTwo) {
        this.popup.querySelector('.popup__close').addEventListener('click', this.close);
        this.validation(inputOne, inputTwo);
        form.addEventListener('submit', this.update);
    }

    removeListeners() {
        this.popup.querySelector('.popup__close').removeEventListener('click', this.close);
    }

    update(event) {
        event.preventDefault();
        let type = this.parentNode.parentNode.classList;
        const inputOne = form.elements.input__one;
        const inputTwo = form.elements.input__two;

        if (type.contains('popup-edit')) {
            api.updateUserInfo(inputOne.value, inputTwo.value);
            this.parentNode.parentNode.remove();
        } else if (type.contains('popup_add')) {
            api.uploadNewCard(inputOne.value, inputTwo.value);
            // cardList.addCard(inputOne.value, inputTwo.value);
            this.parentNode.parentNode.remove();
        }
    }

    close() {
        this.popup.remove();
        this.removeListeners();
    }
    //adding validation to the form according to the type of form
    validation(inputOne, inputTwo) {
        const validator = new Validator;
        form.addEventListener('input', (event) => {
            if (event.target.getAttribute('type') === 'url') {
                validator.urlFormValidator(event);
            } else {
                validator.textFormValidator(event);
            };
            validator.formButtonToggle(inputOne, inputTwo);
        });
    }

}
