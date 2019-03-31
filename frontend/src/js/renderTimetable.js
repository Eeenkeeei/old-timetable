import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const http = new Http('https://timetable-eeenkeeei.herokuapp.com');
// https://timetable-eeenkeeei.herokuapp.com

const usernameBarEl = document.querySelector('#usernameBar');

const storage = new DataStorage(new LocalStorage());

const timetableBodyMondayEl = document.querySelector('#timetableBodyMonday'); // тело таблицы
const timetableBodyTuesdayEl = document.querySelector('#timetableBodyTuesday'); // тело таблицы
const timetableBodyWednesdayEl = document.querySelector('#timetableBodyWednesday'); // тело таблицы
const timetableBodyThursdayEl = document.querySelector('#timetableBodyThursday'); // тело таблицы
const timetableBodyFridayEl = document.querySelector('#timetableBodyFriday'); // тело таблицы
const timetableBodySaturdayEl = document.querySelector('#timetableBodySaturday'); // тело таблицы
const tableEl = document.querySelector('#table');


export default class Render {
    constructor(user) {
        let editLessonFlag = false;
    }

    renderTimetable(user) {
        this.timetableConstructor(user, 'Понедельник', timetableBodyMondayEl);
        this.timetableConstructor(user, 'Вторник', timetableBodyTuesdayEl);
        this.timetableConstructor(user, 'Среда', timetableBodyWednesdayEl);
        this.timetableConstructor(user, 'Четверг', timetableBodyThursdayEl);
        this.timetableConstructor(user, 'Пятница', timetableBodyFridayEl);
        this.timetableConstructor(user, 'Суббота', timetableBodySaturdayEl)
    }

    timetableConstructor(user, dayname, container) {


        container.innerHTML = '';
        user.timetable.forEach(({day, number, name, note, type}) => {

            const lessonTypeAreaEl = document.querySelector('#lessonTypeArea');
            if (day === dayname) {
                const tableItem = document.createElement('tr');
                let typeClass;
                if (type === "Лекция") {
                    typeClass = "h3 badge badge-pill badge-info";
                }
                if (type === "Лабораторная работа") {
                    typeClass = "h3 badge badge-pill badge-warning";
                }
                if (type === "Практика") {
                    typeClass = "h3 badge badge-pill badge-success";
                }
                tableItem.innerHTML = `
                            <td>${number} пара
                            <p><h5><div class="${typeClass}"  id="lessonTypeArea">${type}</div></h5></p> 
                            </td>
                            <td>${name}</td>
                            <td>${note}</td>
            `;

                const tableItemListener = (evt) => {
                    if (this.editLessonFlag === true) {
                        return
                    } else {
                        this.editLessonFlag = true;
                        let lessonNumber = number;
                        let lessonType = type;
                        tableItem.removeEventListener('click', tableItemListener);
                        tableItem.innerHTML = `
                
                    <td>
                    <select class="form-control form-control-sm shadow-sm col-md-5 fadeIn wow animated" id="selectLessonNumber" >
                                <option value="1" id="lessonNumberOne">1</option>
                                <option value="2" id="lessonNumberTwo">2</option>
                                <option value="3" id="lessonNumberThree">3</option>
                                <option value="4" id="lessonNumberFour">4</option>
                                <option value="5" id="lessonNumberFive">5</option>
                                <option value="6" id="lessonNumberSix">6</option>
                                <option value="7" id="lessonNumberSeven">7</option>
                    </select> пара
                            <p>
                            <small class="text-muted h6">
                            <select class="form-control form-control-sm shadow-sm col-md-5 fadeIn wow animated" id="selectLessonType" >
                                <option value="Лекция" id="lessonTypeLection">Лекция</option>
                                <option value="Практика" id="lessonTypePractical">Практика</option>
                                <option value="Лабораторная работа" id="lessonTypeLaboratoryWork">Лабораторная работа</option>
                            </select>
                            </small>
                            </p> 
                            </td>
                            <td>   
                                <input type="text" class="form-control form-control-sm shadow-sm col-md-7 fadeIn wow animated" id="lessonName" placeholder="Название занятия" value="${name}" autofocus="autofocus">
                            </td>
                            <td>
                                <textarea type="text" class="form-control form-control-sm shadow-sm col-md-12 fadeIn wow animated" id="lessonNote" placeholder="Заметка" rows="2">${note}</textarea>
                               
                                <button type="submit" class="btn btn-sm btn-info"  style="margin-top: 10px;">Сохранить</button>
                                <button type="button" class="btn btn-sm btn-danger" id="deleteLesson" style="margin-top: 10px;">Удалить</button>        
                            </td>
                    `;

                        const lessonTypeLectionEl = document.querySelector('#lessonTypeLection');
                        const lessonTypePracticalEl = document.querySelector('#lessonTypePractical');
                        const lessonTypeLaboratoryWorkEl = document.querySelector('#lessonTypeLaboratoryWork');
                        if (lessonType === "Лекция") {
                            lessonTypeLectionEl.selected = true;
                        }
                        if (lessonType === "Практика") {
                            lessonTypePracticalEl.selected = true;
                        }
                        if (lessonType === "Лабораторная работа") {
                            lessonTypeLaboratoryWorkEl.selected = true;
                        }
                        const lessonNumberOneEl = document.querySelector('#lessonNumberOne');
                        const lessonNumberTwoEl = document.querySelector('#lessonNumberTwo');
                        const lessonNumberThree = document.querySelector('#lessonNumberThree');
                        const lessonNumberFour = document.querySelector('#lessonNumberFour');
                        const lessonNumberFive = document.querySelector('#lessonNumberFive');
                        const lessonNumberSix = document.querySelector('#lessonNumberSix');
                        const lessonNumberSeven = document.querySelector('#lessonNumberSeven');
                        if (lessonNumber === "1"){
                            lessonNumberOneEl.selected = true;
                        }
                        if (lessonNumber === "2"){
                            lessonNumberTwoEl.selected = true;
                        }
                        if (lessonNumber === "3"){
                            lessonNumberThree.selected = true;
                        }
                        if (lessonNumber === "4"){
                            lessonNumberFour.selected = true;
                        }
                        if (lessonNumber === "5"){
                            lessonNumberFive.selected = true;
                        }
                        if (lessonNumber === "6"){
                            lessonNumberSix.selected = true;
                        }
                        if (lessonNumber === "7"){
                            lessonNumberSeven.selected = true;
                        }
                        let selectLessonNumber = number;
                        let selectLessonType = type;
                        document.querySelector('#selectLessonNumber')
                            .addEventListener('input', (evt) => {
                                selectLessonNumber = evt.currentTarget.value;
                                console.log(evt.currentTarget.value)
                            });
                        document.querySelector('#selectLessonType')
                            .addEventListener('input', (evt) => {
                                selectLessonType = evt.currentTarget.value;
                            });
                        const editLessonForm = document.querySelector('#editLesson');
                        const editFormListener = async (evt) => {
                            evt.preventDefault();
                            const msgEl = document.querySelector('#msgEl');
                            msgEl.innerHTML = '';

                            msgEl.innerHTML = `
                                <div class="spinner-border text-info fadeIn wow animated" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>
                            `;

                            const lessonNameEl = document.querySelector('#lessonName');
                            let lessonName = lessonNameEl.value;
                            const lessonNoteEl = document.querySelector('#lessonNote');
                            let lessonNote = lessonNoteEl.value;
                            let lessonObject = {
                                day: day,
                                number: selectLessonNumber,
                                name: lessonName,
                                note: lessonNote,
                                type: selectLessonType
                            };
                            const oldLesson = {
                                day: day,
                                number: number,
                                name: name,
                                note: note,
                                type: type
                            };

                            for (const timetableElement of user.timetable) {
                                if (timetableElement.day === oldLesson.day && timetableElement.number === oldLesson.number && timetableElement.name === oldLesson.name
                                    && timetableElement.note === oldLesson.note && timetableElement.type === oldLesson.type)
                                {
                                    user.timetable[user.timetable.indexOf(timetableElement)] = lessonObject;
                                }
                            }
                            const data = new Link(user);
                            storage.add(data);
                            let timetableUpdate = await http.timetableUpdate(user);

                            let _resultUpdateFlag = '';
                            await timetableUpdate.json().then(async (data) => {
                                _resultUpdateFlag = data;
                                await console.log(data);
                            });

                            msgEl.innerHTML = `
                            <div class="alert alert-warning alert-dismissible fade show fadeIn wow animated shadow-sm" id="errorEl" role="alert">
                                <strong>Запись отредактирована</strong>
                                 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                                 </button>
                            </div>
                            `;
                            editLessonForm.removeEventListener('submit', editFormListener);
                            this.renderTimetable(user);
                            this.editLessonFlag = false;
                        };
                        editLessonForm.addEventListener('submit', editFormListener);



                        const deleteLessonListener = async (evt) =>{
                            const msgEl = document.querySelector('#msgEl');
                            msgEl.innerHTML = '';
                            msgEl.innerHTML = `
                                <div class="spinner-border text-info fadeIn wow animated" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>
                            `;
                            //todo: добавление в юзер.дата
                            const deletedLesson = {
                                day: day,
                                number: number,
                                name: name,
                                note: note,
                                type: type
                            };
                            for (const timetableElement of user.timetable) {
                                if (timetableElement.day === deletedLesson.day && timetableElement.number === deletedLesson.number && timetableElement.name === deletedLesson.name
                                    && timetableElement.note === deletedLesson.note && timetableElement.type === deletedLesson.type)
                                {
                                    user.timetable.splice(user.timetable.indexOf(timetableElement), 1);
                                }
                            }

                            const data = new Link(user);
                            storage.add(data);
                            let timetableUpdate = await http.timetableUpdate(user);

                            let _resultUpdateFlag = '';
                            await timetableUpdate.json().then(async (data) => {
                                _resultUpdateFlag = data;
                                await console.log(data);
                            });

                            msgEl.innerHTML = `
                            <div class="alert alert-danger alert-dismissible fade show fadeIn wow animated shadow-sm" id="errorEl" role="alert">
                                <strong>Запись удалена</strong>
                                 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                                 </button>
                            </div>
                            `;
                            await this.renderTimetable(user);
                            this.editLessonFlag = false;
                            deleteLessonButton.removeEventListener('click', deleteLessonButton);
                        };

                        const deleteLessonButton = document.querySelector('#deleteLesson');
                        deleteLessonButton.addEventListener('click', deleteLessonListener)
                    }
                };
                tableItem.addEventListener('click', tableItemListener);
                container.appendChild(tableItem);
            }
        });
    }
}



