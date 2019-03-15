export class LocalStorage {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('data'));

    }

    add(data) {
        this.data = data;
        this.save();
    }

    unlogin() {
        localStorage.removeItem('data');
    }

    save() {
        localStorage.setItem('data', JSON.stringify(this.data)); // stringify - преобразование объекта в строку
    }


}

