export class Http {
    items = 'items';
    resultFlag = '1';
    constructor(url) {
        this.url = url;
    }

    getAll() {
        return fetch(this.url);
    }

    getRegFlag() {
        return fetch(`${this.url}/resultFlag`, {
        })
            // .then(dataWrappedByPromise => dataWrappedByPromise.json())
            // .then(data => {
            //     // you can access your data here
            //     this.resultFlag = data;
            //     console.log(this.resultFlag)
            // });
    }


    save(item) {
        return fetch(`${this.url}/resultFlag`, {
            body: JSON.stringify(item),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    add (item) {
        return fetch(`${this.url}/resultFlag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
    }

    removeById(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        });
    }

    changeLink(item){
        return fetch(`${this.url}/${item}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
    }

    deleteAll(){
        return fetch(`${this.url}`, {
            method: 'DELETE'
        });
    }

}