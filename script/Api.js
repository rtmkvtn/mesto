class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.token = options.token;
        this.groupId = options.groupId;
    }
//get user info from server onLoad
    setUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this.token,
            }
        })
            .then((res) => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((data)=>{
                userName.textContent = data.name;
                userJob.textContent = data.about;
                userAvatar.setAttribute('style', `background-image: url(${data.avatar})`);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
//get all the cards from server  
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this.token,
            }
        })
            .then((res) => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((obj)=>{
                cardList.render(obj);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
//edit user info from edit popup
    updateUserInfo(name, job) {
        fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((data)=>{
            userName.textContent = data.name;
            userJob.textContent = data.about;
        })
        .catch((err)=>{
            console.log(err);
        })
    }
//add new card by user through add popup
    uploadNewCard(name, pic) {
        fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: pic
            })
        })
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((obj)=>{
            cardList.addCard(obj.name, obj.link);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  
}
