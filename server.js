const express = require('express');
const app = express();
const PORT = 3000
const mongoose = require('mongoose');
const stories = require('./models/stories.js')
const mongoURI = 'mongodb://localhost:27017/';
const db = mongoose.connection;
let ejs = require('ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))


app.get('/', ( req, res )=>{
  res.send('!');
});

app.get('/start', (req, res) => {
  res.render('index.ejs');
})
app.get('/start/new', (req, res) => {
  res.render('new.ejs')
})

app.get('/start/:index', (req,res) => {
    res.render('show.ejs',
     {
    start:start[req.params.index]
    })
})




mongoose.connect(mongoURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('the connection with mongod is established');
});

db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})