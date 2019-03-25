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

    }

    renderTimetable(user) {
        this.timetableConstructor(user, 'Понедельник', timetableBodyMondayEl);
        this.timetableConstructor(user, 'Вторник', timetableBodyTuesdayEl);
        this.timetableConstructor(user, 'Среда', timetableBodyWednesdayEl);
        this.timetableConstructor(user, 'Четверг', timetableBodyThursdayEl);
        this.timetableConstructor(user, 'Пятница', timetableBodyFridayEl);
        this.timetableConstructor(user, 'Суббота', timetableBodySaturdayEl)

    }
    editLessonFlag = false;
    timetableConstructor(user, dayname, container) {
        container.innerHTML = '';
        user.timetable.forEach(({day, number, name, note, type}) => {

            if (day === dayname) {
                const tableItem = document.createElement('tr');

                tableItem.innerHTML = `
                            <td>${number} пара
                            <p><small class="text-muted h6">${type}</small></p> 
                            </td>
                            <td>${name}</td>
                            <td>${note}</td>
            `;
                const typeTextEl = document.querySelector('#type');

                const listener = (evt) => {

                    if (this.editLessonFlag === true) {
                        return
                    } else {
                        this.editLessonFlag = true;
                        let lessonNumber = number;
                        let lessonType = type;
                        tableItem.removeEventListener('click', listener);
                        console.log(day, number, name, note, type);
                        tableItem.innerHTML = `
<form>
                    <td><select class="form-control form-control-sm shadow-sm col-md-5" id="selectLessonNumber">
                                <option value="1" id="lessonNumberOne">1</option>
                                <option value="2" id="lessonNumberTwo">2</option>
                                <option value="3" id="lessonNumberThree">3</option>
                                <option value="4" id="lessonNumberFour">4</option>
                                <option value="5" id="lessonNumberFive">5</option>
                                <option value="6" id="lessonNumberSix">6</option>
                                <option value="7" id="lessonNumberSeven">7</option>
                    </select> пара
                            <p><small class="text-muted h6">
                            <select class="form-control form-control-sm shadow-sm col-md-5" id="selectLessonType">
                                <option value="Лекция" id="lessonTypeLection">Лекция</option>
                                <option value="Практика" id="lessonTypePractical">Практика</option>
                                <option value="Лабораторная работа" id="lessonTypeLaboratoryWork">Лабораторная работа</option>
                            </select>
                            </small></p> 
                            </td>
                            <td>   
                                <input type="text" class="form-control form-control-sm shadow-sm col-md-7" id="lessonName" placeholder="Название занятия" value="${name}">
                            </td>
                            <td>
                                <textarea type="text" class="form-control form-control-sm shadow-sm col-md-12" id="lessonNote" placeholder="Заметка" rows="2" style="margin-right: 0px !important;">${note}</textarea>

                                <button type="submit" class="btn-sm btn-info" id="editLesson" style="margin-top: 10px;">Сохранить</button>
                                <button type="submit" class="btn-sm btn-danger" id="editLesson" style="margin-top: 10px;">Удалить</button>
                            </td>
                            
                            </form>
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
                        const editLessonButton = document.querySelector('#editLesson');
                        editLessonButton.addEventListener('click', (evt) => {
                            //todo: добавление в юзер.дата
                            evt.preventDefault();
                            this.renderTimetable(user);
                            console.log('submit');
                            this.editLessonFlag = false;
                        })
                        // this.renderTimetable(user)
                    }
                };
                tableItem.addEventListener('click', listener);


                container.appendChild(tableItem);
            }
        });
    }
}



