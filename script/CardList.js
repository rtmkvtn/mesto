class CardList {
    constructor(container) {
        this.container = container;
        this.cardList = [];    
    }

    render(obj) {
        for (let i = 0; i < obj.length; i++) {
            this.addCard(obj[i].name, obj[i].link);
        }   
    }

    addCard(title, picSource) {
        const { card } = new Card(title, picSource);
        this.cardList.push(card);
        this.container.appendChild(card);
    }

}