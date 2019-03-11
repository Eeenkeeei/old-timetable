import {Http} from "./http.js";

const regNicknameEl = document.querySelector('#regNickname');
const regPassEl = document.querySelector('#regPass');
const regFormEl = document.querySelector('#regForm');

const http = new Http('https://timetable-eeenkeeei.herokuapp.com/items');


regFormEl.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const regNickname = regNicknameEl.value; // поле ввода названия

    const regPass = regPassEl.value; // поле ввода тегов

    const item = {
        id: 0,
        nickname: regNickname,
        password: regPass
    };
    console.log(item);
    http.add(item);
});