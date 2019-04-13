import {ConnectAccount} from "./connectAccount.js";
import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {ServerLink} from "./serverLink.js";
import RenderQuestionList from "./renderQuestionList.js";

export function help() {

    const serverLink = new ServerLink();
    const http = new Http(serverLink.link);
    const usernameBarEl = document.querySelector('#usernameBar');
    const connectAccount = new ConnectAccount();
    const storage = new DataStorage(new LocalStorage());
    const renderQuestionList = new RenderQuestionList();

    let user;
    (async function updateUser() {
        if (storage.getUserData === null) {
            document.location.href = 'index.html'
        } else {
            await connectAccount.getData();
            user = await connectAccount.user;
            renderQuestionList.renderQuestionList(user);
            usernameBarEl.textContent = user.username;
        }
    })();

    const exitButtonEl = document.querySelector('#exitButton');
    exitButtonEl.addEventListener('click', (evt) => {
        storage.unlogin();
        document.location.href = 'index.html'
    });

    const questionFormEl = document.querySelector('#questionForm');
    const questionFormListener = async (evt) => {
        evt.preventDefault();
        const inputThemeEl = document.querySelector('#inputTheme');
        const inputTextEl = document.querySelector('#inputText');
        if (inputThemeEl.value.length < 6) {
            inputThemeEl.className = 'form-control is-invalid';
            return;
        }
        if (inputTextEl.value.length < 30) {
            inputTextEl.className = 'form-control is-invalid';
            return;
        }
        let questionObject = {
            theme: inputThemeEl.value,
            question: inputTextEl.value,
            status: 'false'
        };
        inputThemeEl.className = 'form-control';
        inputTextEl.className = 'form-control';
        user.support.push(questionObject);
        let timetableUpdate = await http.timetableUpdate(user);
        let _resultUpdateFlag = '';
        await timetableUpdate.json().then(async (data) => {
            _resultUpdateFlag = data;
            await console.log(data);
            renderQuestionList.renderQuestionList(user);
        });
        inputTextEl.value = '';
        inputThemeEl.value = '';
    };
    questionFormEl.addEventListener('submit', questionFormListener);
}
