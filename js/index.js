import Http from "./http.js";

const logFormEl = document.querySelector('#logForm');
const logUsernameEl = document.querySelector('#logUsername');
const logPasswordEl = document.querySelector('#logPassword');

const http = new Http('https://timetable-eeenkeeei.herokuapp.com');

const errorEl = document.createElement('div'); // создание блока ошибок
errorEl.innerHTML = '';


logFormEl.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    errorEl.innerHTML = `
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

    let _token = ''; // ОТВЕЧАЕТ ЗА ФЛАГ РЕГИСТРАЦИИ, false если ник занят, true если нет
    let getRegFlag = await http.auth(user);
    await getRegFlag.json().then(async (data) => {
        _token = data;
        console.log(_token.token);
        if (_token.token === undefined) {
            errorEl.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" id="errorEl" role="alert">
            <strong>Ой!</strong> Проверьте правильность введенных данных
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
            return;
        } else {
            errorEl.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" id="errorEl" role="alert">
            <strong>Вы успешно авторизовались!</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>`
        }
        let object = await http.userAccess(_token.token);
        _token = '';
        let _userObject; // ОБЪЕКТ С ДАННЫМИ ЮЗЕРА
        await object.json().then(async (data) => {
            _userObject = data;
            console.log(_userObject);
        })
    });
    logFormEl.appendChild(errorEl)
});
