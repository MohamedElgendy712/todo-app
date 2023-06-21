let express = require('express');
let todoController = require('./controllers/todoController');

let app = express();

// set up template engine
app.set('view engine' , 'ejs');

// static files
app.use(express.static('./public'))

// fire controllers
todoController(app);



