import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const storage = new DataStorage(new LocalStorage());
const http = new Http('https://timetable-eeenkeeei.herokuapp.com');
// https://timetable-eeenkeeei.herokuapp.com
export class PasswordChanger {

    changePassword() {
        const securityMsgEl = document.createElement('label');
        securityMsgEl.innerHTML = '';
        const changePasswordTextEl = document.querySelector('#changePassword');
        const changePasswordTextElListener = (evt) => {
            changePasswordTextEl.removeEventListener('click', changePasswordTextElListener);
            changePasswordTextEl.innerHTML = `
    <form id="changePasswordForm" class="fadeIn wow animated">
  <div class="form-group fadeIn wow animated">
    <label>Старый пароль</label>
    <input type="password" class="form-control form-control-sm fadeIn wow animated" id="oldPassword" pattern="(?=.*\\d)(?=.*[a-z]).{8,}" required>
  </div>

  <div class="form-group fadeIn wow animated">
    <label>Новый пароль</label>
    <input type="password" class="form-control form-control-sm fadeIn wow animated" id="newPassword" pattern="(?=.*\\d)(?=.*[a-z]).{8,}" required>
  </div>
  <div class="form-group fadeIn wow animated">
    <label>Повторите новый пароль</label>
    <input type="password" class="form-control form-control-sm fadeIn wow animated" id="confirmNewPassword" pattern="(?=.*\\d)(?=.*[a-z]).{8,}" required>
  </div>
    <label class="form-text text-muted">Не менее 8 символов. Только латинские буквы и цифры</label>

  <button type="submit" class="btn btn-outline-dark btn-sm">Подтвердить</button>
  <button type="button" class="btn btn-outline-dark btn-sm" id="cancelChangeButton">Отменить</button>

</form>
    `;
            const cancelChangeButtonEl = document.querySelector('#cancelChangeButton');
            cancelChangeButtonEl.addEventListener('click', ()=>{
                console.log(1)
            });
            const changePasswordFormEl = document.querySelector('#changePasswordForm');
            const changePasswordFormListener = async (evt) => {
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

                let changeRequest = await http.changePassword(newPasswordObject);
                await changeRequest.json().then((data)=>{

                    console.log(data);
                    const securityLabelEl = document.querySelector('#securityLabel');
                    if (data === 'Updated') {
                        securityLabelEl.appendChild(securityMsgEl);
                        securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeIn wow animated"><h6>Пароль сохранен</h6></label>
                    `;
                        changePasswordTextEl.innerHTML = `
                        ИЗМЕНИТЬ ПАРОЛЬ
                        `;

                        let _userObject = storage.getUserData.data;
                        _userObject.password = confirmNewPassword;
                        const line = new Link(_userObject);
                        storage.add(line);
                        setTimeout(()=>{
                            securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeOut wow animated"><h6>Пароль сохранен</h6></label>
                    `;
                        },4000);

                        changePasswordTextEl.addEventListener('click', changePasswordTextElListener)
                    }
                    if (data === 'Bad password length') {
                        securityLabelEl.appendChild(securityMsgEl);
                        securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeIn wow animated"><h6>Длина пароля меньше 8 символов</h6></label>
                    `;
                    }
                    if (data === 'Passwords matches') {
                        securityLabelEl.appendChild(securityMsgEl);
                        securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeIn wow animated"><h6>Старый и новый пароль совпадает</h6></label>
                    `;
                    }
                    if (data === 'Bad confirm') {
                        securityLabelEl.appendChild(securityMsgEl);
                        securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeIn wow animated"><h6>Новые пароли не совпадают</h6></label>
                    `;
                    }
                    if (data === 'Not confirmed') {
                        securityLabelEl.appendChild(securityMsgEl);
                        securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeIn wow animated"><h6>Старый пароль не совпадает </h6></label>
                    `;
                    }

                });
                console.log(newPasswordObject);

            };
            changePasswordFormEl.addEventListener('submit', changePasswordFormListener)
        };
        changePasswordTextEl.addEventListener('click', changePasswordTextElListener);
    }
}
