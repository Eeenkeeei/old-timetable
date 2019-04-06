import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";
import Render from "./renderTimetable.js";
import {ConnectAccount} from "./connectAccount.js";

import {ServerLink} from "./serverLink.js";
const serverLink = new ServerLink();
const http = new Http(serverLink.link);

// const authForSync = new WebSocket("ws://timetable-eeenkeeei.herokuapp.com/updateData");
// const syncWithServer = new WebSocket("ws://timetable-eeenkeeei.herokuapp.com/sync");

const storage = new DataStorage(new LocalStorage());
const renderClass = new Render();
if (storage.getUserData === null) {
    document.location.href = 'index.html'
}
let user = storage.getUserData.data;

const usernameBarEl = document.querySelector('#usernameBar');
usernameBarEl.textContent = storage.getUserData.data.username;

const connectAccount = new ConnectAccount();
connectAccount.updateData();

const timetableDivEl = document.querySelector('#timetableDiv'); // корневой див для таблицы

let selectLessonNumber = '1';
let selectLessonDay = 'Понедельник';
let selectLessonType = 'Лекция';

let innerHTML = `
<div class="fadeIn wow animated" data-animation="true">
                    <form id="addLessonForm">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">

                                    <label id="inputNameLabel">Название заметки</label>
                                    <input type="text" class="form-control form-control-sm shadow-sm" id="lessonName"
                                           placeholder="Название заметки" autofocus="autofocus">
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label>Примечание</label>
                                    <input type="text" class="form-control form-control-sm shadow-sm" id="lessonNote"
                                           placeholder="Примечание">
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label id="inputNameLabel">Теги</label>
                                    <p>
                                        <span class="badge badge-danger tagsSize">Важно</span>
                                        <span class="badge badge-success tagsSize">Не срочно</span>
                                        <span class="badge badge-info tagsSize">Не срочно</span>
                                        <span class="badge badge-light tagsSize">Не срочно</span>
                                        <span class="badge badge-warning tagsSize">Средне</span>
                                    </p>
                                </div>

                            </div>



                                <button type="submit" class="btn btn-success shadow" id="addTaskButton"><strong>Применить</strong>
                                </button>
                                <button type="button" class="btn btn-danger shadow" id="cancelAddButton"
                                        style="margin: 0px"><strong>Отмена</strong></button>

                        </div>
                    </form>
                </div>
`;

//
// authForSync.onopen = function (event) {
//     console.log("Opened socket!");
//     authForSync.send(user.username);
// };
//
// syncWithServer.onmessage = function (event) {
//     if ((JSON.parse(event.data)).username === user.username) {
//         console.log((JSON.parse(event.data)).username);
//     }
//     syncWithServer.close();
// };

// renderClass.renderTimetable(user);

const msgEl = document.querySelector('#msgEl');
msgEl.innerHTML = '';


let lessonObject = {};
const addDivFormEl = document.querySelector('#addDivForm');
const addTaskButtonEl = document.querySelector('#addTaskButton');
addTaskButtonEl.addEventListener('click', () => {
    // renderClass.renderTimetable(user);
    renderClass.editLessonFlag = false;
    addDivFormEl.innerHTML = '';
    addDivFormEl.innerHTML = innerHTML;
    const addLessonFormEl = document.querySelector('#addLessonForm');


    const cancelAddButton = document.querySelector('#cancelAddButton');
    cancelAddButton.addEventListener('click', () => {
        const animatedDivEl = document.querySelector('[data-animation=true]');
        animatedDivEl.className = 'fadeOut wow animated';
        setTimeout(() => {
            addLessonFormEl.innerHTML = '';
        }, 900);
    });

    addLessonFormEl.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        msgEl.innerHTML = `
    <div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `;
        const lessonNameEl = document.querySelector('#lessonName');
        let lessonName = lessonNameEl.value;
        if (lessonName.length < 2){
            msgEl.innerHTML = '';
            lessonNameEl.className = 'form-control form-control-sm shadow-sm is-invalid';
            return
        }
        const lessonNoteEl = document.querySelector('#lessonNote');
        let lessonNote = lessonNoteEl.value;
        setTimeout(() => {
            addLessonFormEl.innerHTML = '';
        }, 900);
        const animatedDivEl = document.querySelector('[data-animation=true]');
        animatedDivEl.className = 'fadeOut wow animated';
        lessonObject = {
            day: selectLessonDay,
            number: selectLessonNumber,
            name: lessonName,
            note: lessonNote,
            type: selectLessonType
        };
        user.timetable.push(lessonObject);
        const data = new Link(user);
        storage.add(data);
        let timetableUpdate = await http.timetableUpdate(user);
        // renderClass.renderTimetable(user);

        let _resultUpdateFlag = '';
        await timetableUpdate.json().then(async (data) => {
            _resultUpdateFlag = data;
            await console.log(data);
        });

        if (_resultUpdateFlag === 'Timetable Updated') {
            msgEl.innerHTML = '';
            msgEl.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show shadow-sm" id="errorEl" role="alert">
            <strong>Занятие добавлено</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;

        }
    })
});






