require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      auth = require('./middleware/auth'),
      cont = require('./controllers/controller');

const app = express(),
      port = 3005;

app.use(bodyParser.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));

app.use(function(req, res, next) {
    console.log("Here is high quality custom top level middleware!");
    next()
})

app.get('/api/getUser', cont.getUser)

app.put('/api/toDo', auth, cont.changeToDos)
app.post('/api/login', cont.login)
app.post('/api/logout', cont.logout)

app.listen(port, () => console.log(`listening on port ${port}`));