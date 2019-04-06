import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";
import Render from "./renderTimetable.js";
import {ConnectAccount} from "./connectAccount.js";

import {ServerLink} from "./serverLink.js";
import {RenderTags} from "./renderTagList.js";
const serverLink = new ServerLink();
const http = new Http(serverLink.link);
const renderTagList = new RenderTags();
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
                                    <label id="inputNameLabel" class="h6">Добавить теги:</label>
                                    <p>
                                       <div class="account-label h6" style="cursor: pointer" id="tagsInner"></div>
                                       <!--INNER ДЛЯ ФОРМЫ ДОБАВЛЕНИЯ ТЕГА-->
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

const msgEl = document.querySelector('#msgEl');
msgEl.innerHTML = '';



const addDivFormEl = document.querySelector('#addDivForm');
const addTaskButtonEl = document.querySelector('#addTaskButton');
addTaskButtonEl.addEventListener('click', () => {
    const addNewTagInner = document.querySelector('#addNewTagInner');
    const serviceMsgEl = document.createElement('label');
    serviceMsgEl.innerHTML = '';
    const tagsInnerEl = document.querySelector('#tagsInner');
    renderClass.editLessonFlag = false;
    addDivFormEl.innerHTML = '';
    addDivFormEl.innerHTML = innerHTML;
    renderTagList.renderTagsForTracker(user);
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









        // const data = new Link(user);
        // storage.add(data);
        // let timetableUpdate = await http.timetableUpdate(user);
        //
        // let _resultUpdateFlag = '';
        // await timetableUpdate.json().then(async (data) => {
        //     _resultUpdateFlag = data;
        //     await console.log(data);
        // });
        //
        // if (_resultUpdateFlag === 'Timetable Updated') {
        //     msgEl.innerHTML = '';
        //     msgEl.innerHTML = `
        // <div class="alert alert-success alert-dismissible fade show shadow-sm" id="errorEl" role="alert">
        //     <strong>Занятие добавлено</strong>
        //     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        //     <span aria-hidden="true">&times;</span>
        //     </button>
        // </div>
        // `;
        //
        // }
    })
});






