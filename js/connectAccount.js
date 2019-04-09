import Http from "./http.js";
import {DataStorage} from "./lib.js";
import {LocalStorage} from "./storage.js";
import {Link} from "./lib.js";

const storage = new DataStorage(new LocalStorage());
import {ServerLink} from "./serverLink.js";

const serverLink = new ServerLink();
const http = new Http(serverLink.link);


export class ConnectAccount {

    async getData() {
        let object = await http.userAccess(storage.getUserData.data);
        await object.json().then(async (data) => {
            this.user = data;
            console.log(data);
            if (data.code === 'Unauthorized') {
                window.location.href = '/index.html';
                storage.unlogin();
            }
            if (data === 'Null'){
                window.location.href = '/index.html';
                storage.unlogin();
            }
        })
    }
}

//
const usernameBarEl = document.querySelector('#usernameBar');

const exitButtonEl = document.querySelector('#exitButton');
exitButtonEl.addEventListener('click', (evt) => {
    storage.unlogin();
    document.location.href = 'index.html'
});

