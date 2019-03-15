import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const usernameBarEl = document.querySelector('#usernameBar');

const storage = new DataStorage(new LocalStorage());

const user = storage.getUserData.data;


usernameBarEl.textContent = user.username;
console.log(user);

console.log(user.timetable[0]);