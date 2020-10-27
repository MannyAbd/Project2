const express = require('express');
const app = express();
const PORT = 3000
const mongoose = require('mongoose');
const Start = require('./models/start.js')
const mongoURI = 'mongodb://localhost:27017/';
const db = mongoose.connection;
const ejs = require('ejs');
app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
setTimeout(() => { db.close(); }, 5000);

app.get('/', ( req, res )=>{
  res.send('!');
});

app.get('/start', (req, res) => {
  res.render('index.ejs', {
    start:Start
  });
})
app.get('/start/new', (req, res) => {
  res.render('new.ejs')
})

app.get('/start/:index', (req,res) => {
    res.render('show.ejs',
     {
    start:Start[req.params.index]
    })
})
mongoose.connect(mongoURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('the connection with mongod is established');
});

// db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
// db.on('connected', () => console.log('mongo connected: ', mongoURI))
// db.on('disconnected', () => console.log('mongo disconnected'))


const firstThread = {
  title: 'anxious',
  body: 'hi',
  author: 'manny'
};

Start.create(firstThread , (error, start) => {
  if (error) {
    console.log(error);
  } else {
    console.log(start);
  }
  db.close();
});

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
