import PicPopup from './PicPopup';

export default class Card {
    constructor(title, picSource) {
        this.card = this.template(title, picSource);
        this.delete = this.delete.bind(this);
        this.addListeners();
    }

    template(title, picSource) {
        const templateCard = `
        <div class="place-card">
            <div class="place-card__image" style="background-image: url(${picSource})">
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name">${title}</h3>
                <button class="place-card__like-icon" ></button>
            </div>
        </div>`;
        let element = document.createElement('div');
        element.insertAdjacentHTML("beforeend", templateCard.trim(''));
        return element.firstChild;
    }

    addListeners() {
        this.card.addEventListener('click', (event) => {
            if (event.target.classList.contains('place-card__delete-icon')) {
                this.delete();
            } else if (event.target.classList.contains('place-card__like-icon')) {
                this.like();
            } else if (event.target.classList.contains('place-card__image')) {
                this.popupOpener();
            }
        })
    }

    clickListener(event) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            this.delete();
        } else if (event.target.classList.contains('place-card__like-icon')) {
            this.like();
        } else if (event.target.classList.contains('place-card__image')) {
            this.popupOpener();
        }
    }
    
    popupOpener() {
        const bgLink = event.target.getAttribute('style');
        const imageAlt = event.target.nextSibling.textContent;
        const imageLink = bgLink.substring(bgLink.indexOf('h'), bgLink.indexOf(')'));
        const popup = new PicPopup(imageLink, imageAlt);
        popup.render();
    }

    like() {
        this.card.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
    }

    delete() {
        this.card.remove();
    }

}