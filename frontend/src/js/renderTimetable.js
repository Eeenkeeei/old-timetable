import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const http = new Http('https://timetable-eeenkeeei.herokuapp.com');
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

const exitButtonEl = document.querySelector('#exitButton');
exitButtonEl.addEventListener('click', (evt) => {
    storage.unlogin();
    document.location.href = 'index.html'
});
usernameBarEl.textContent = user.username;

let timetableData = user.timetable;


const timetableDivEl = document.querySelector('#timetableDiv'); // корневой див для таблицы

console.log(timetableData)
