export default {

    DB_NAME: 'wtw-log',
    DB_VERSION: 2,

    // using connection-per-operation.  .: all operations need to call this async method.
    async connect() {
        return new Promise((resolve, reject) => {

            let request = window.indexedDB.open(this.DB_NAME, this.DB_VERSION)

            request.onerror = e => {
                console.log('Error opening ' + this.DB_NAME, e)
                reject('Error')
            }

            request.onsuccess = e => {
                resolve(e.target.result)
            }

            request.onupgradeneeded = e => {
                console.log('onupgradeneeded')
                let db = e.target.result
                let objectStore = db.createObjectStore('store', {autoIncrement: true, keyPath: 'id'})
            }
        })
    },

    async add(entry) {
        let connect = await this.connect()

        return new Promise(resolve => {

            let trans = connect.transaction('store', 'readwrite')
            trans.oncomplete = () => {
                resolve()
            };

            let store = trans.objectStore('store')
            store.add(entry)
        })

    }
}


