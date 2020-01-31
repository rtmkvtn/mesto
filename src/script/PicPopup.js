export default class PicPopup {
    constructor(image, alt) {
        this.popup = null;
        this.image = image;
        this.alt = alt;
        this.close = this.close.bind(this);
    }

    template() {
        const templatePopup = `
        <div class="popup popup-image popup_is-opened">
        <div class="popup-image__content">
          <img src="./images/close.svg" alt="" class="popup__close">
          <img src="${this.image}" alt="${this.alt}" class="popup__image">
        </div>`
        let element = document.createElement('div');
        element.insertAdjacentHTML("beforeend", templatePopup.trim(''));
        return element.firstChild;
    }

    render() {
        this.popup = this.template();
        document.querySelector('.root').appendChild(this.popup);
        this.addListeners();
    }

    addListeners() {
        this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    }

    removeListeners() {
        this.popup.querySelector('.popup__close').removeEventListener('click', this.close);
    }

    close() {
        this.popup.remove();
        this.removeListeners();
    }
}
