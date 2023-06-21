const {MongoClient} = require('mongodb')

let dbConnection
let uri = "mongodb+srv://mohamed:mo7121998@cluster0.myzh7ct.mongodb.net/"



module.exports = {
    ConnectToDb : (cb) => {
        MongoClient.connect(uri)
        .then((client) =>{
            dbConnection = client.db()
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        })
    },
    getDb : () => dbConnection
}