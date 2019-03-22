import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const http = new Http('http://localhost:7777');
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
console.log(user);
const exitButtonEl = document.querySelector('#exitButton');
exitButtonEl.addEventListener('click', (evt) => {
    storage.unlogin();
    document.location.href = 'index.html'
});
usernameBarEl.textContent = user.username;

let timetableData = user.timetable;


const timetableDivEl = document.querySelector('#timetableDiv'); // корневой див для таблицы

let selectLessonNumber = '1';
let selectLessonDay = 'Понедельник';

let innerHTML = `
<div class="fadeIn wow animated" data-animation="true">
<form id="addLessonForm"> 
<div class="container">
<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
       
    <label for="selectDay">Название</label>
    <input type="text" class="form-control form-control-sm shadow-sm" id="lessonName" placeholder="Название занятия">
</div>
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
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
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
    <label >День</label>
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
      </div>
    
  </div>
</div>
</form>
</div>
`;
let lessonObject = {};
const addDivFormEl = document.querySelector('#addDivForm');
const addLessonButtonEl = document.querySelector('#addLessonButton');
addLessonButtonEl.addEventListener('click', () => {
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

    addLessonFormEl.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const lessonNameEl = document.querySelector('#lessonName');
        let lessonName = lessonNameEl.value;
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
            note: lessonNote
        };
        user.timetable.push(lessonObject);
        console.log(user);
        const data = new Link(user);
        storage.add(data);
        await http.timetableUpdate(user);

    })
});





