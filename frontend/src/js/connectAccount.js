import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const storage = new DataStorage(new LocalStorage());
const http = new Http('https://timetable-eeenkeeei.herokuapp.com');



export class ConnectAccount {
    constructor(){
        let user;
    }

    async getData() {
        const userForAuth = {
            "username": this.user.username,
            "password": this.user.password
        };

        let _token;
        let getAuthFlag = await http.auth(userForAuth);

        await getAuthFlag.json().then(async (data) => {
            _token = data;
            let object = await http.userAccess(_token.token);
            _token = '';
            let _userObject; // ОБЪЕКТ С ДАННЫМИ ЮЗЕРА
            await object.json().then(async (data) => {
                _userObject = data;
                const line = new Link(_userObject);
                await storage.add(line);
                this.user = storage.getUserData.data;
            })
        });
    }

    updateData(){
        if (storage.getUserData === null) {
            document.location.href = 'index.html'
        } else {
            this.user = storage.getUserData.data;
            this.getData();
        }
    }

}


const usernameBarEl = document.querySelector('#usernameBar');

const exitButtonEl = document.querySelector('#exitButton');
exitButtonEl.addEventListener('click', (evt) => {
    storage.unlogin();
    document.location.href = 'index.html'
});

