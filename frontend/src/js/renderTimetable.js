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
// let user = storage.getUserData.data;
export default class Render {
    constructor(user) {
        // this.user = user  // исходный объект
    }

    renderTimetable(user) {
        this.timetableConstructor(user, 'Понедельник', timetableBodyMondayEl);
        this.timetableConstructor(user, 'Вторник', timetableBodyTuesdayEl);
        this.timetableConstructor(user, 'Среда', timetableBodyWednesdayEl);
        this.timetableConstructor(user, 'Четверг', timetableBodyThursdayEl);
        this.timetableConstructor(user, 'Пятница', timetableBodyFridayEl);
        this.timetableConstructor(user, 'Суббота', timetableBodySaturdayEl)

    }

    timetableConstructor (user, dayname, container) {
        container.innerHTML = '';
        user.timetable.forEach(({day, number, name, note}) => {
            if (day === dayname) {
                const tableItem = document.createElement('tr');
                tableItem.innerHTML = `
                            <td>${number}</td>
                            <td>${name}</td>
                            <td>${note}</td>
            `;
                container.appendChild(tableItem);
                console.log(day, number, name, note)
            }
        });
    }
}



