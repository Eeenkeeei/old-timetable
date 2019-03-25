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

usernameBarEl.textContent = user.username;

const exitButtonEl = document.querySelector('#exitButton');
exitButtonEl.addEventListener('click', (evt)=>{
    storage.unlogin();
    document.location.href = 'index.html'
});

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




let gender = '';



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

const accountWindowEl = document.querySelector('#accountWindow'); // Jumbotron - в нем данные об аккаунте / форма изменения
const changeDataButtonEl = document.querySelector('#changeDataButton');
changeDataButtonEl.addEventListener('click', (evt) => {
    changeDataButtonEl.className = 'btn btn-outline-dark invisible';
    accountWindowEl.innerHTML = `
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
        accountWindowEl.innerHTML = `
         <div class="row" id="accountData">
                        <label class="col-sm-3"><h5>Имя пользователя</h5></label>
                        <div class="col-sm-9">
                            <span data-id="accountName"></span>
                        </div>
                        <label class="col-sm-3"><h5>Email</h5></label>
                        <div class="col-sm-9">
                            <span data-id="accountEmail"></span>
                        </div>
                        <label class="col-sm-3"><h5>Возраст</h5></label>
                        <div class="col-sm-9">
                            <span data-id="accountAge"></span>
                        </div>
                        <label class="col-sm-3"><h5>Место работы/учебы</h5></label>
                        <div class="col-sm-9">
                            <span data-id="accountUniversity"></span>
                        </div>
                        <label class="col-sm-3"><h5>Пол</h5></label>
                        <div class="col-sm-9">
                            <span data-id="accountGender"></span>
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

        changeDataButtonEl.className = 'btn btn-outline-dark';

    });
});


const msgEl = document.createElement('div');
msgEl.innerHTML = '';


