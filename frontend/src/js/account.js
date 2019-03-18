import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const http = new Http('http://localhost:7777');
// https://timetable-eeenkeeei.herokuapp.com

const usernameBarEl = document.querySelector('#usernameBar');

const storage = new DataStorage(new LocalStorage());

let user;

// если в хранилище нет данных редирект на начальную
if (storage.getUserData === null) {
    document.location.href = 'index.html'
} else {
    user = storage.getUserData.data
}

usernameBarEl.textContent = user.username;

const exitButtonEl = document.querySelector('#exitButton');
exitButtonEl.addEventListener('click', (evt)=>{
    storage.unlogin();
    document.location.href = 'index.html'
});

const accountNameEl = document.querySelector('#accountName');
accountNameEl.placeholder = user.username;

const accountEmailEl = document.querySelector('#accountEmail');
accountEmailEl.value = user.email;

const accountAgeEl = document.querySelector('#accountAge');
accountAgeEl.value = user.age;

const accountUniversityEl = document.querySelector('#accountUniversity');
// TODO:

const accountGenderMenEl = document.querySelector('#genderMen');
const accountGenderWomenEl = document.querySelector('#genderWomen');

if (user.gender === 'Мужской') {
    accountGenderMenEl.checked = true;
} else if (user.gender === 'Женский') {
    accountGenderWomenEl.checked = true;
}

let gender;

Array.from(document.querySelectorAll('[name=gridRadios]'))
    .forEach((value) => {
        value.addEventListener('change', ()=>{
            gender = value.value;
        });
    });


// todo:
// (function() {
//     console.log("Opening connection");
//     const exampleSocket = new WebSocket("ws:/localhost:8080/websocket/attach");
//     exampleSocket.onopen = function (event) {
//         console.log("Opened socket!");
//         exampleSocket.send("Here's some text that the server is urgently awaiting!");
//     };
//     exampleSocket.onmessage = function (event) {
//         console.log("return:", event.data);
//         exampleSocket.close();
//     }
// })();

const accountChangeFormEl = document.querySelector('#accountChangeForm');
accountChangeFormEl.addEventListener('submit', evt => {
    evt.preventDefault();
    user.email = accountEmailEl.value;
    user.age = accountAgeEl.value;
    user.gender = gender;
    const line = new Link(user);
    storage.add(line);
    http.updateData(user)

});
