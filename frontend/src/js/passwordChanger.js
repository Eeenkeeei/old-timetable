import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const storage = new DataStorage(new LocalStorage());
const http = new Http('http://localhost:7777');
// https://timetable-eeenkeeei.herokuapp.com
export class PasswordChanger {

    changePassword() {
        const changePasswordTextEl = document.querySelector('#changePassword');
        const changePasswordTextElListener = (evt) => {
            changePasswordTextEl.removeEventListener('click', changePasswordTextElListener);
            changePasswordTextEl.innerHTML = `
    <form id="changePasswordForm">
  <div class="form-group fadeIn wow animated">
    <label>Старый пароль</label>
    <input type="password" class="form-control form-control-sm" id="oldPassword" pattern="(?=.*\\d)(?=.*[a-z]).{8,}">
  </div>

  <div class="form-group fadeIn wow animated">
    <label>Новый пароль</label>
    <input type="password" class="form-control form-control-sm" id="newPassword" pattern="(?=.*\\d)(?=.*[a-z]).{8,}">
  </div>
  <div class="form-group fadeIn wow animated">
    <label>Повторите новый пароль</label>
    <input type="password" class="form-control form-control-sm" id="confirmNewPassword" pattern="(?=.*\\d)(?=.*[a-z]).{8,}">
  </div>
    <label class="form-text text-muted">Не менее 8 символов. Только латинские буквы и цифры</label>

  <button type="submit" class="btn btn-outline-dark btn-sm">Подтвердить</button>
</form>
    `;
            const changePasswordFormEl = document.querySelector('#changePasswordForm');
            const changePasswordFormListener = (evt) => {
                evt.preventDefault();
                const oldPasswordEl = document.querySelector('#oldPassword');
                const newPasswordEl = document.querySelector('#newPassword');
                const confirmNewPasswordEl = document.querySelector('#confirmNewPassword');
                let oldPassword = oldPasswordEl.value;
                let newPassword = newPasswordEl.value;
                let confirmNewPassword = confirmNewPasswordEl.value;
                const user = storage.getUserData.data;
                const newPasswordObject = {
                    username: user.username,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                };
                http.changePassword(newPasswordObject);
                console.log(newPasswordObject);
                changePasswordTextEl.innerHTML = `
                Изменить пароль
                `;
                changePasswordTextEl.addEventListener('click', changePasswordTextElListener)
            };
            changePasswordFormEl.addEventListener('submit', changePasswordFormListener)
        };
        changePasswordTextEl.addEventListener('click', changePasswordTextElListener);
    }
}
