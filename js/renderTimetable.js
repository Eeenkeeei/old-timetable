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

    timetableConstructor (user, dayname, container) {
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
                tableItem.addEventListener('click', ()=>{
                    console.log('click')
                    tableItem.removeEventListener('click', ()=>{
                        console.log('click')

                    })
                });
                container.appendChild(tableItem);
            }
        });
    }
}



