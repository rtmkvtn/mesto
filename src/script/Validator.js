import validErrorsRu from './validErrors';

export default class Validator {
    //getting right error-message element for check
    getErrorElement() {
        const errorrString = document.querySelectorAll('.popup__error');
        for (let i=0; i<errorrString.length; i++) {
            if (errorrString[i].previousElementSibling == event.target) {
            return errorrString[i];
            }
        }
    };
    //take right error message from errors obj and put it into the error field
    stringValid(errorString) {
        errorString.textContent = validErrorsRu.stringValid;
    }
    stringNothing(errorString) {
        errorString.textContent = validErrorsRu.stringNoExist;
    }
    stringBadLength(errorString) {
        errorString.textContent = validErrorsRu.stringLenght;
    }
    linkInvalid(errorString) {
        errorString.textContent = validErrorsRu.linkNotLink;
    }
    //validator func for text input 
    textFormValidator(event) {
        const input = event.target;
        const errorrStringEvent = this.getErrorElement(event);
        if (input.validity.valid) {
            this.stringValid(errorrStringEvent);
        } else if (input.value.length === 0) {
            this.stringNothing(errorrStringEvent);
        } else if ((input.value.length < 2) || (input.value.length > 30)) {
            this.stringBadLength(errorrStringEvent);
        };
    };
    //validator func for link input
    urlFormValidator(event) {
        const input = event.target;
        const errorrStringEvent = this.getErrorElement(event);
        if (input.validity.valid) {
            this.stringValid(errorrStringEvent);
        } else {
            this.linkInvalid(errorrStringEvent);    
        };
    };
    //form button activity toggle
    formButtonToggle(a, b) {
        if ((a.validity.valid) && (b.validity.valid)) {
            a.parentNode.querySelector(".popup__button").removeAttribute('disabled');
            a.parentNode.querySelector(".popup__button").classList.add('button_active');
        } else {
            a.parentNode.querySelector(".popup__button").setAttribute('disabled', true);
            a.parentNode.querySelector(".popup__button").classList.remove('button_active');
        }
    };
    
}