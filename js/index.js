import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

// если в хранилище есть данные юзера, редирект на страницу аккаунта
const storage = new DataStorage(new LocalStorage());
if (storage.getUserData !== null) {
    window.location.href = 'account.html'
}


const logFormEl = document.querySelector('#logForm');
const logUsernameEl = document.querySelector('#logUsername');
const logPasswordEl = document.querySelector('#logPassword');

import {ServerLink} from "./serverLink.js";
const serverLink = new ServerLink();
const http = new Http(serverLink.link);


const textBoxEl = document.createElement('div'); // создание блока ошибок
textBoxEl.innerHTML = '';

logFormEl.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    textBoxEl.innerHTML = `
    <div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `;
    logFormEl.appendChild(textBoxEl)
});

logFormEl.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    textBoxEl.innerHTML = `
    <div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `;

    const username = logUsernameEl.value;
    const password = logPasswordEl.value;
    let user = {
        "username": username,
        "password": password
    };

    let _token = '';
    let getRegFlag = await http.auth(user);
    await getRegFlag.json().then(async (data) => {

        _token = data;
        if (_token.token === undefined) {
            textBoxEl.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" id="errorEl" role="alert">
            <strong>Ой!</strong> Проверьте правильность введенных данных
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
            return;
        }
        let object = await http.userAccess(_token.token);

        let _userObject; // ОБЪЕКТ С ДАННЫМИ ЮЗЕРА
        await object.json().then(async (data) => {
            _userObject = data;
            console.log(data);
            const line = new Link(_token.token);
            _token = '';
            await storage.add(line);
            window.location.href = _userObject.startPage;
        })
    });
    logFormEl.appendChild(textBoxEl)
});
