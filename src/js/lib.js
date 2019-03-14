export class Link {
    constructor(data) {
       this.data = data
    }
}

export class DataStorage {
    constructor(storage) {
        this.storage = storage;
    }

    get getUserData() {
        return this.storage.data;
    }

    add(data) {
        this.storage.add(data);
    }
}
