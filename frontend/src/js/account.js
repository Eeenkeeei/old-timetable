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


// TODO: поле универа
const accountUniversityEl = document.querySelector('#accountUniversity');


const accountGenderMenEl = document.querySelector('#genderMen');
const accountGenderWomenEl = document.querySelector('#genderWomen');


let gender;

Array.from(document.querySelectorAll('[name=genderRadios]'))
    .forEach((value) => {
        value.addEventListener('change', ()=>{
            gender = value.value;
        });
    });

if (user.gender === 'Мужской') {
    accountGenderMenEl.checked = true;
    gender = 'Мужской'
} else if (user.gender === 'Женский') {
    accountGenderWomenEl.checked = true;
    gender = 'Женский'
}

// todo:
//
// (function() {
//     console.log("Opening connection");
//     const exampleSocket = new WebSocket("ws://localhost:7777/websocket/attach");
//     exampleSocket.onopen = function (event) {
//         console.log("Opened socket!");
//         exampleSocket.send("Here's some text that the server is urgently awaiting!");
//     };
//     exampleSocket.onmessage = function (event) {
//         console.log("return:", event.data);
//         exampleSocket.close();
//     }
// })();

const msgEl = document.createElement('div');
msgEl.innerHTML = '';

const accountChangeFormEl = document.querySelector('#accountChangeForm');
accountChangeFormEl.addEventListener('submit', async evt => {
    evt.preventDefault();

    msgEl.innerHTML = `
    <div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `;
    accountChangeFormEl.appendChild(msgEl);

    user.email = accountEmailEl.value;
    user.age = accountAgeEl.value;
    user.gender = gender;
    console.log(user.gender);
    const line = new Link(user);
    storage.add(line);
    let updateData1 = await http.updateData(user);
    let message;
    await updateData1.json().then(async (data) => {
        message = data;
        await console.log(message);
    });

    if (message === 'Data updated'){
        msgEl.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" id="errorEl" role="alert">
            <strong>Данные обновлены</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        accountChangeFormEl.appendChild(msgEl);
    }

});
