const MongoClient = require('mongodb').MongoClient

class Connection {

    constructor() {
        this.url = `mongodb+srv://<user>:<password>@spiceandwolf.brqr5.mongodb.net/seed?retryWrites=true&w=majority`
    }

    connect() {
        return new Promise((resolve, reject) => {
            //this.client = new this.MongoClient //({ useNewUrlParser: true })
            this.client = MongoClient.connect(this.url, (err, db) => {
                if(err){
                    reject('error en la conexión')
                } else {
                    this.db = db
                    resolve()
                }
            })
        })
    }
}

module.exports = Connection
