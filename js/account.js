import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";



const usernameBarEl = document.querySelector('#usernameBar');

const storage = new DataStorage(new LocalStorage());

let user;

// если в хранилище нет данных редирект на начальную
if (storage.getUserData === null) {
    document.location.href = 'index.html'
} else {
    user = storage.getUserData.data
}

usernameBarEl.textContent = user.username;
console.log(user);

const exitButtonEl = document.querySelector('#exitButton');
exitButtonEl.addEventListener('click', (evt)=>{
    storage.unlogin();
    document.location.href = 'index.html'
});

const accountNameEl = document.querySelector('#accountName');
accountNameEl.placeholder = user.username;

const accountEmailEl = document.querySelector('#accountEmail');
accountEmailEl.value = user.email;

const accountAgeEl = document.querySelector('#accountAge');
accountAgeEl.value = user.age;

const accountUniversityEl = document.querySelector('#accountUniversity');
// TODO:

const accountGenderMenEl = document.querySelector('#genderMen');
const accountGenderWomenEl = document.querySelector('#genderWomen');

if (user.gender === 'Мужской') {
    accountGenderMenEl.checked = true;
} else if (user.gender === 'Женский') {
    accountGenderWomenEl.checked = true;
}

let gender;

Array.from(document.querySelectorAll('[name=gridRadios]'))
    .forEach((value) => {
        value.addEventListener('change', ()=>{
            gender = value.value;
        });
    });


const accountChangeFormEl = document.querySelector('#accountChangeForm');
accountChangeFormEl.addEventListener('submit', evt => {
    evt.preventDefault();
    user.email = accountEmailEl.value;
    user.age = accountAgeEl.value;
    user.gender = gender;
    console.log(user);
    const line = new Link(user);
    storage.add(line);


});
