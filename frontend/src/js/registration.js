import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

// если в хранилище есть данные юзера, редирект на страницу аккаунта
const storage = new DataStorage(new LocalStorage());
if (storage.getUserData !== null) {
    window.location.href = 'account.html'
}

const regNicknameEl = document.querySelector('#regNickname'); // поле ввода nickname
const regPassEl = document.querySelector('#regPass'); // поле ввода pass
const regFormEl = document.querySelector('#regForm');
const regPassConfirmEl = document.querySelector('#confirmRegPass');
const regAgeEl = document.querySelector('#regAge');
const regEmailEl = document.querySelector('#regEmail');
const regEduEl = document.querySelector('#regEdu');


const http = new Http('https://timetable-eeenkeeei.herokuapp.com');
// https://timetable-eeenkeeei.herokuapp.com


const errorEl = document.createElement('div'); // создание блока ошибок
errorEl.innerHTML = '';

regFormEl.addEventListener('submit', evt => {
    evt.preventDefault();

// todo: проверка на язык ввода, запрещенные символы

    errorEl.innerHTML = `
    <div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `;
    regFormEl.appendChild(errorEl);
});

let regGender = '';
Array.from(document.querySelectorAll('[name=genderRadios]'))
    .forEach((value) => {
        value.addEventListener('change', () => {
            regGender = value.value;
        });
    });

regFormEl.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    errorEl.innerHTML = `
    <div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `;
    const regPass = regPassEl.value;
    const regNickname = regNicknameEl.value;
    const regPassConfirm = regPassConfirmEl.value;
    const regEdu = regEduEl.value;
    const regEmail = regEmailEl.value;
    const regAge = regAgeEl.value;

    const newUser = {
        nickname: regNickname.trim(),
        password: regPass.trim(),
        passwordConfirm: regPassConfirm.trim(),
        edu: regEdu.trim(),
        email: regEmail.trim(),
        gender: regGender,
        age: regAge.trim()
    };

    let _resultRegFlag = '';
    let getRegFlag = await http.add(newUser);
    await getRegFlag.json().then(async (data) => {
            _resultRegFlag = data;
        });

    if (_resultRegFlag === 'Bad Request(age)') {
        errorEl.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" id="errorEl" role="alert">
            Введите число в поле ввода возраста
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        regFormEl.appendChild(errorEl);
        return;
    }

    if (_resultRegFlag === 'Bad Password') {
        errorEl.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" id="errorEl" role="alert">
            <strong>Ой!</strong> Пароли не совпадают
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        regFormEl.appendChild(errorEl);
        return;
    }
    if (_resultRegFlag === 'Bad Request') {
        errorEl.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" id="errorEl" role="alert">
            <strong>Ой!</strong> Введенное имя пользователя или пароль должны удовлетворять условиям
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        regFormEl.appendChild(errorEl);
        return;
    } else if (_resultRegFlag === 'true') {

        const userForAuth = {
            "username": regNickname.trim(),
            "password": regPass.trim()
        };

        let _token;
        let getAuthFlag = await http.auth(userForAuth);

        await getAuthFlag.json().then(async (data) => {
            _token = data;
            let object = await http.userAccess(_token.token);
            _token = '';
            let _userObject; // ОБЪЕКТ С ДАННЫМИ ЮЗЕРА
            await object.json().then(async (data) => {
                _userObject = data;
                const line = new Link(_userObject);
                await storage.add(line);
                window.location.href = 'account.html'
            })
        });

    } else {
        errorEl.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" id="errorEl" role="alert">
            <strong>Ой!</strong> К сожалению, это имя уже занято
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        regFormEl.appendChild(errorEl);
    }
});
