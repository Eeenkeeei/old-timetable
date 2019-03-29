import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";
import Render from "./renderTimetable.js";
import {ConnectAccount} from "./connectAccount.js";

const http = new Http('https://timetable-eeenkeeei.herokuapp.com');
const authForSync = new WebSocket("ws://https://timetable-eeenkeeei.herokuapp.com/updateData");
const syncWithServer = new WebSocket("ws://https://timetable-eeenkeeei.herokuapp.com/sync");


// https://timetable-eeenkeeei.herokuapp.com

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
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2">
       
    <label for="selectDay">Название</label>
    <input type="text" class="form-control form-control-sm shadow-sm" id="lessonName" placeholder="Название занятия" autofocus="autofocus">
</div>
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2">
        <label for="selectDay">Заметка</label>
        <input type="text" class="form-control form-control-sm shadow-sm" id="lessonNote" placeholder="Заметка">
    </div>
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"><label for="selectDay">Номер</label>
         <select class="form-control form-control-sm shadow-sm" id="selectLessonNumber">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
         </select>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"><label for="selectDay">Тип занятия</label>
         <select class="form-control form-control-sm shadow-sm" id="selectLessonType">
                                <option value="Лекция">Лекция</option>
                                <option value="Практика">Практика</option>
                                <option value="Лабораторная работа">Лабораторная работа</option>
         </select>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
    <label>День</label>
                            <select class="form-control form-control-sm shadow-sm" id="selectLessonDay">
                                <option value="Понедельник">Понедельник</option>
                                <option value="Вторник">Вторник</option>
                                <option value="Среда">Среда</option>
                                <option value="Четверг">Четверг</option>
                                <option value="Пятница">Пятница</option>
                                <option value="Суббота">Суббота</option>
                            </select>
      </div>
      <div class="col">
          <label></label>
          <button type="submit" class="btn btn-success shadow" id="addFormButton"><strong>+</strong></button>
          <button type="button" class="btn btn-danger shadow" id="cancelAddButton"><strong>Отмена</strong></button>
      </div>
    
  </div>
</div>
</form>
</div>
`;


authForSync.onopen = function (event) {
    console.log("Opened socket!");
    authForSync.send(user.username);
};

syncWithServer.onmessage = function (event) {
    if ((JSON.parse(event.data)).username === user.username) {
        console.log((JSON.parse(event.data)).username);
    }
    syncWithServer.close();
};

renderClass.renderTimetable(user);

const msgEl = document.createElement('div');
msgEl.innerHTML = '';
const msgDivEl = document.querySelector('#msgEl');

let lessonObject = {};
const addDivFormEl = document.querySelector('#addDivForm');
const addLessonButtonEl = document.querySelector('#addLessonButton');
addLessonButtonEl.addEventListener('click', () => {
    renderClass.renderTimetable(user);
    addDivFormEl.innerHTML = '';
    addDivFormEl.innerHTML = innerHTML;
    const addLessonFormEl = document.querySelector('#addLessonForm');
    document.querySelector('#selectLessonNumber')
        .addEventListener('input', (evt) => {
            selectLessonNumber = evt.currentTarget.value;
        });
    document.querySelector('#selectLessonDay')
        .addEventListener('input', (evt) => {
            selectLessonDay = evt.currentTarget.value;
        });
    document.querySelector('#selectLessonType')
        .addEventListener('input', (evt) => {
            selectLessonType = evt.currentTarget.value;
        });

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
        addLessonFormEl.appendChild(msgEl);
        const lessonNameEl = document.querySelector('#lessonName');
        let lessonName = lessonNameEl.value;
        if (lessonName.length < 2){
            msgEl.innerHTML = `
            <p class="text-muted" style="margin-top: 5px">Введите название. Не менее 2 символов </p>
            `;
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
        // console.log(user);
        const data = new Link(user);
        storage.add(data);
        let timetableUpdate = await http.timetableUpdate(user);
        renderClass.renderTimetable(user);

        let _resultUpdateFlag = '';
        await timetableUpdate.json().then(async (data) => {
            _resultUpdateFlag = data;
            await console.log(data);
        });

        if (_resultUpdateFlag === 'Timetable Updated') {
            msgEl.innerHTML = '';
            msgEl.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show shadow-sm" id="errorEl" role="alert">
            <strong>Данные обновлены</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
            msgDivEl.appendChild(msgEl);
        }
    })
});






