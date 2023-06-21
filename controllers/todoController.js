let bodyParser = require('body-parser');
const {ConnectToDb , getDb} = require("../db");
const {ObjectId} = require('mongodb')

let urlencodedParser = bodyParser.urlencoded({extended: false});
let db


//let data = [{item: 'get a milk'},{item: 'walk dog'},{item: 'kick some code'}]




module.exports = (app) => {

    let data = []

    // connect to db
ConnectToDb((err) =>{
    if(!err){
        // listen to port
        app.listen(3000)
        console.log("You're lestening to port 3000");
    }
    db = getDb()
})

    app.get('/todo' , (req , res) =>{
        // get data from database and pass to view
        
        db.collection('todo')
        .find()
        .forEach((todo) =>{
            data.push(todo)
        })
        .then(() =>{
            res.status(200).render('todo' ,{todos: data});
        })
        .catch((err) =>{
            res.status(500).json({error : "could not fetch the documents"})
        })
    })

    app.post('/todo' , urlencodedParser , (req , res) =>{
        // get data from to view and get to database
        const todo = req.body
        db.collection('todo')
        .insertOne(todo)
        .then((data) =>{
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({error : "could not fetch the documents"})
        }) 
    })

    app.delete('/todo/:id' , (req , res) =>{
        // delete the requested item from database
        db.collection('todo')
        .deleteOne({item: req.params.id})

        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g , "-") !== req.params.item;
        // })
        // res.json(data);
    })
}