import {Http} from "./http.js";

const regNicknameEl = document.querySelector('#regNickname'); // поле ввода nickname
const regPassEl = document.querySelector('#regPass'); // поле ввода pass
const regFormEl = document.querySelector('#regForm');

const http = new Http('https://timetable-eeenkeeei.herokuapp.com/items');

const errorEl = document.createElement('div'); // создание блока ошибок
errorEl.innerHTML = ''; // очистка блока чтобы не было копий

regFormEl.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const regPass = regPassEl.value;
    const regNickname = regNicknameEl.value;

    if (regNickname.length < 4 || regPass.length < 7) {
        errorEl.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" id="errorEl" role="alert">
  <strong>Ой!</strong> Введенное имя пользователя или пароль недоступны :(
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
        `;
        regFormEl.appendChild(errorEl);
        return
    }

    const newUser = {
        nickname: regNickname.trim(),
        password: regPass.trim()
    };
    console.log(newUser);
    // http.add(newUser);
});