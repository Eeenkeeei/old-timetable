import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const storage = new DataStorage(new LocalStorage());

import {ServerLink} from "./serverLink.js";
import {ConnectAccount as connectAccount} from "./connectAccount.js";
const serverLink = new ServerLink();
const http = new Http(serverLink.link);

export class PasswordChanger {

    changePassword(user) {
        const securityMsgEl = document.createElement('label');
        securityMsgEl.innerHTML = '';
        const changePasswordTextEl = document.querySelector('#changePassword');
        const changePasswordInnerEl = document.querySelector('#changePasswordInner');
        const changePasswordTextElListener = (evt) => {
            changePasswordTextEl.removeEventListener('click', changePasswordTextElListener);
            changePasswordInnerEl.innerHTML = `
    <form id="changePasswordForm" class="fadeIn wow animated">
  <div class="form-group fadeIn wow animated">
    <label>Старый пароль</label>
    <input name="input1" type="password" class="form-control form-control-sm fadeIn wow animated" id="oldPassword" pattern="(?=.*\\d)(?=.*[a-z]).{8,}" required>
  </div>

  <div class="form-group fadeIn wow animated">
    <label>Новый пароль</label>
    <input name="input2"  type="password" class="form-control form-control-sm fadeIn wow animated" id="newPassword" pattern="(?=.*\\d)(?=.*[a-z]).{8,}" required>
  </div>
  <div class="form-group fadeIn wow animated">
    <label>Повторите новый пароль</label>
    <input name="input3"  type="password" class="form-control form-control-sm fadeIn wow animated" id="confirmNewPassword" pattern="(?=.*\\d)(?=.*[a-z]).{8,}" required>
  </div>
    <label class="form-text text-muted">Не менее 8 символов. Только латинские буквы и цифры</label>

  <button type="submit" class="btn btn-outline-dark btn-sm">Подтвердить</button>
  <button type="button" class="btn btn-outline-dark btn-sm" id="cancelChangeButton">Отменить</button>

</form>
    `;
            const cancelChangeButtonEl = document.querySelector('#cancelChangeButton');
            cancelChangeButtonEl.addEventListener('click', ()=>{
                changePasswordFormEl.className = 'fadeOut wow animated';
                setTimeout(()=>{

                    changePasswordInnerEl.innerHTML = `
                        
                        `;
                }, 800);

                changePasswordTextEl.addEventListener('click', changePasswordTextElListener);

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
                        changePasswordInnerEl.innerHTML = `
                        
                        `;
                        this.authAfterPasswordChange(user.username, confirmNewPassword);

                        setTimeout(()=>{
                            securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeOut wow animated"><h6>Пароль сохранен</h6></label>
                    `;
                        },4000);
                        changePasswordTextEl.addEventListener('click', changePasswordTextElListener);

                    }
                    if (data === 'Bad password length') {
                        securityLabelEl.appendChild(securityMsgEl);
                        securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeIn wow animated"><h6>Длина пароля меньше 8 символов</h6></label>
                    `;
                        setTimeout(()=>{
                            securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeOut wow animated"><h6>Длина пароля меньше 8 символов</h6></label>
                    `;
                        },4000);
                    }
                    if (data === 'Passwords matches') {
                        securityLabelEl.appendChild(securityMsgEl);
                        securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeIn wow animated"><h6>Старый и новый пароль совпадает</h6></label>
                    `;
                        setTimeout(()=>{
                            securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeOut wow animated"><h6>Старый и новый пароль совпадает</h6></label>
                    `;
                        },4000);
                    }
                    if (data === 'Bad confirm') {
                        securityLabelEl.appendChild(securityMsgEl);
                        securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeIn wow animated"><h6>Новые пароли не совпадают</h6></label>
                    `;
                        setTimeout(()=>{
                            securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeOut wow animated"><h6>Новые пароли не совпадают</h6></label>
                    `;
                        },4000);
                    }
                    if (data === 'Not confirmed') {
                        securityLabelEl.appendChild(securityMsgEl);
                        securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeIn wow animated"><h6>Старый пароль не совпадает </h6></label>
                    `;
                        setTimeout(()=>{
                            securityMsgEl.innerHTML = `
                         <label class="text-muted account-label fadeOut wow animated"><h6>Старый пароль не совпадает </h6></label>
                    `;
                        },4000);
                    }
                });
            };
            changePasswordFormEl.addEventListener('submit', changePasswordFormListener)
        };
        changePasswordTextEl.addEventListener('click', changePasswordTextElListener);
    }

    async authAfterPasswordChange(username, password) {
        let userToAuth = {
            "username": username,
            "password": password
        };

        let _token = '';
        let getRegFlag = await http.auth(userToAuth);
        await getRegFlag.json().then(async (data) => {
            _token = data;
            console.log(data);
            let object = await http.userAccess(_token.token);
            let _userObject; // ОБЪЕКТ С ДАННЫМИ ЮЗЕРА
            await object.json().then(async (data) => {
                _userObject = data;
                console.log(data);
                const line = new Link(_token.token);
                _token = '';
                await storage.add(line);
            })
        });
        const line = new Link(_userObject);
        storage.add(line);
    };
}
