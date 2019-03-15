import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";



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
console.log(user);

console.log(user.timetable[0]);

const exitButtonEl = document.querySelector('#exitButton');
exitButtonEl.addEventListener('click', (evt)=>{
    storage.unlogin();
    document.location.href = 'index.html'
});