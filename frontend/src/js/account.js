import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";
import {ConnectAccount} from "./connectAccount.js";

const http = new Http('http://localhost:7777');
// https://timetable-eeenkeeei.herokuapp.com

const usernameBarEl = document.querySelector('#usernameBar');
const connectAccount = new ConnectAccount();
const storage = new DataStorage(new LocalStorage());
let selectStartPage = 'index.html';
let user;

if (storage.getUserData === null) {
    document.location.href = 'index.html'
}

usernameBarEl.textContent = storage.getUserData.data.username;
connectAccount.updateData();

// если в хранилище нет данных редирект на начальную
if (storage.getUserData === null) {
    document.location.href = 'index.html'
} else {
    user = storage.getUserData.data;
    connectAccount.updateData()
}

const exitButtonEl = document.querySelector('#exitButton');
exitButtonEl.addEventListener('click', (evt)=>{
    storage.unlogin();
    document.location.href = 'index.html'
});

const rootDivEl = document.querySelector('#accountWindow');
rootDivEl.innerHTML = '';
function renderAccount (container) {
    container.innerHTML = `
    <div class="row" id="accountData">
                            <label class="col-sm-5 h4 text-muted account-label">Учетная запись</label>
                            <div class="col-sm-4" >
                                <label  class="account-label h6 ">ИМЯ ПОЛЬЗОВАТЕЛЯ</label>
                                <p><label data-id="accountName" class="h5"></label></p>
                            </div>

                            <label class="col-sm-5 account-label"><h4></h4></label>
                            <div class="col-sm-4">
                                <label class="account-label h6">EMAIL</label>
                                <p><label data-id="accountEmail" class="h5"></label></p>
                            </div>
                            <label class="col-sm-5 account-label"><h4></h4></label>
                            <div class="col-sm-4">
                                <label class="account-label h6">ВОЗРАСТ</label>
                                <p><label data-id="accountAge" class="h5"></label></p>
                            </div>

                            <label class="col-sm-5 account-label"><h4></h4></label>
                            <div class="col-sm-4">
                                <label class="account-label h6">МЕСТО УЧЕБЫ</label>
                                <p><label data-id="accountUniversity" class="h5"></label></p>
                            </div>

                            <label class="col-sm-5 account-label"><h4></h4></label>
                            <div class="col-sm-4">
                                <label class="account-label h6">ПОЛ</label>
                                <p><label data-id="accountGender" class="h5"></label></p>
                            </div>

                            <label class="col-sm-5 text-muted account-label" ><h4>Сервисы</h4></label>
                            <div class="col-sm-4">
                                <label class="account-label h6">СТАРТОВАЯ СТРАНИЦА</label>
                                <p><label data-id="accountStartPage" class="h5"></label></p>
                            </div>

                            <label class="col-sm-5 account-label"><h4></h4></label>
                            <div class="col-sm-4">
                                <label class="account-label h6">РАСПИСАНИЕ ЗАНЯТИЙ</label>
                                <p><label data-id="accountLessonsTimetable" class="h5"></label></p>
                            </div>
                        </div>
                        
    `;
    const accountDataNameEl = document.querySelector('[data-id=accountName]');
    accountDataNameEl.textContent = user.username;

    const accountDataEmailEl = document.querySelector('[data-id=accountEmail]');
    accountDataEmailEl.textContent = user.email;

    const accountDataAgeEl = document.querySelector('[data-id=accountAge]');
    accountDataAgeEl.textContent = user.age;

    const accountDataUniversityEl = document.querySelector('[data-id=accountUniversity]');
    accountDataUniversityEl.textContent = user.edu;

    const accountDataGenderEl = document.querySelector('[data-id=accountGender]');
    accountDataGenderEl.textContent = user.gender;

    const accountDataStartPageEl = document.querySelector('[data-id=accountStartPage]');

    if (user.startPage === "account.html"){
        accountDataStartPageEl.textContent = "Аккаунт";
    }

    if (user.startPage === "readlater.html"){
        accountDataStartPageEl.textContent = "Список для чтения";
    }

    if (user.startPage === "tasktracker.html"){
        accountDataStartPageEl.textContent = "Менеджер задач";
    }

    if (user.startPage === "timetable.html"){
        accountDataStartPageEl.textContent = "Расписание";
    }
}

renderAccount(rootDivEl);

let gender = '';

const changeDataButtonEl = document.querySelector('#changeDataButton');

const editAccountListener = (evt) => {
    changeDataButtonEl.className = 'btn btn-outline-dark invisible';
    rootDivEl.innerHTML = `
    <form id="accountChangeForm">
                        <h3>Изменение информации об аккаунте</h3>
                        <div class="form-group row">
                            <label for="accountName" class="col-sm-3 col-form-label"><h5>Имя пользователя</h5></label>
                            <div class="col-sm-9">
                                <input readonly class="form-control" id="accountName" placeholder="Имя пользователя">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="accountEmail" class="col-sm-3 col-form-label"><h5>Email</h5></label>
                            <div class="col-sm-9">
                                <input class="form-control" id="accountEmail" placeholder="Email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="accountAge" class="col-sm-3 col-form-label"><h5>Возраст</h5></label>
                            <div class="col-sm-9">
                                <input class="form-control" id="accountAge" placeholder="Возраст">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="accountAge" class="col-sm-3 col-form-label"><h5>Место работы/учебы</h5></label>
                            <div class="col-sm-9">
                                <input class="form-control" id="accountUniversity"
                                       placeholder="Место работы/учебы">
                            </div>
                        </div>

                        <fieldset class="form-group">
                            <div class="row">
                                <legend class="col-form-label col-sm-2 pt-0"><h5>Пол</h5></legend>
                                <div class="col-sm-10">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="genderRadios" id="genderMen"
                                               value="Мужской">
                                        <label class="form-check-label" for="genderMen">
                                            Мужской
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="genderRadios"
                                               id="genderWomen"
                                               value="Женский">
                                        <label class="form-check-label" for="genderWomen">
                                            Женский
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-group row">
                            <label for="accountAge" class="col-sm-3 col-form-label"><h5>Стартовая страница</h5></label>
                            <div class="col-sm-9">
                                <select class="form-control form-control-sm shadow-sm" id="accountStartPage">
                                <option value="account.html" id="accountStartPage">Аккаунт</option>
                                <option value="timetable.html" id="timetableStartPage">Расписание</option>
                                <option value="readlater.html" id="readlaterStartPage">Список для чтения</option>
                                <option value="tasktracker.html" id="tasktrackerStartPage">Менеджер задач</option>
                            </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-10">
                                <button type="submit" class="btn btn-success" id="accountInfoChange">Сохранить
                                    изменения
                                </button>
                            </div>
                        </div>
                    </form>
    `;
    const accountNameEl = document.querySelector('#accountName');
    const accountEmailEl = document.querySelector('#accountEmail');
    const accountAgeEl = document.querySelector('#accountAge');
    const accountUniversityEl = document.querySelector('#accountUniversity');
    const accountGenderMenEl = document.querySelector('#genderMen');
    const accountGenderWomenEl = document.querySelector('#genderWomen');
    const accountStartPageEl = document.querySelector('#accountStartPage');
    const timetableStartPageEl = document.querySelector('#timetableStartPage');
    const readlaterStartPageEl = document.querySelector('#readlaterStartPage');
    const tasktrackerStartPageEl = document.querySelector('#tasktrackerStartPage');

    accountNameEl.placeholder = user.username;
    accountEmailEl.value = user.email;
    accountAgeEl.value = user.age;
    accountUniversityEl.value = user.edu;
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

    if (user.startPage === 'account.html') {
        accountStartPageEl.selected = true;
    }
    if (user.startPage === 'timetable.html') {
        timetableStartPageEl.selected = true;
    }
    if (user.startPage === 'readlater.html') {
        readlaterStartPageEl.selected = true;
    }
    if (user.startPage === 'tasktracker.html') {
        tasktrackerStartPageEl.selected = true;
    }
    document.querySelector('#accountStartPage')
        .addEventListener('change', (evt) => {
            selectStartPage = evt.currentTarget.value;

        });
    const accountChangeFormEl = document.querySelector('#accountChangeForm');
    accountChangeFormEl.addEventListener('submit', async evt => {
        evt.preventDefault();

        msgEl.innerHTML = `
    <div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `;
        accountChangeFormEl.appendChild(msgEl);

        user.startPage = selectStartPage;
        user.email = accountEmailEl.value;
        user.age = accountAgeEl.value;
        user.gender = gender;
        user.edu = accountUniversityEl.value;
        const data = new Link(user);
        storage.add(data);
        let updateData = await http.updateData(user);
        let _resultUpdateFlag = '';
        await updateData.json().then(async (data) => {
            _resultUpdateFlag = data;
            await console.log(data);
        });

        if (_resultUpdateFlag === 'Data updated'){
            msgEl.innerHTML = '';
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
        if (_resultUpdateFlag === 'Bad Request(age)') {
            msgEl.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" id="errorEl" role="alert">
            Введите число в поле ввода возраста
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
            accountChangeFormEl.appendChild(msgEl);
        }
        renderAccount(rootDivEl);
        changeDataButtonEl.className = 'btn btn-outline-dark';

    });
};

changeDataButtonEl.addEventListener('click', editAccountListener);


const msgEl = document.createElement('div');
msgEl.innerHTML = '';


