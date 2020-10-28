const express = require('express');
const app = express();
const PORT = 3000
const mongoose = require('mongoose');
const Start = require('./models/start.js')
const mongoURI = 'mongodb://localhost:27017/';
const ejs = require('ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.get('/', ( req, res )=>{
  res.send('!');
});

app.get('/start', (req, res) => {
  res.render('index.ejs', {
    start:Start
  })
})

app.get('/start/new', (req, res) => {
  res.render('new.ejs')
})

app.get('/start/:id', (req,res)=>{
  Start.find({}, (error, threadId)=>{
    res.render('show.ejs',{
    threadId : req.params.id
      })
    })
  });

app.post('/thread', (req, res) => {
  Start.create(req.body, (error, createdStart) => {
    if (error) {
      console.log(error)
    }
    else{
      res.redirect('/start/id')
     }
  })
})

app.get('/start/:id/edit', (req, res) =>{
  res.render('edit.ejs', {
    threadId : threadId[req.params.id],
    id: req.params.id
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
// const firstThread = {
//   title: 'anxious',
//   body: 'hi',
//   author: 'manny'
// };

// app.get('/start/:id', (req, res) => {
//   res.render('edit.ejs', {
//     id: Start[req.params.id],
// 		id: req.params.id
//  })
// })

app.post('/thread', (req, res) => {
  Start.push(req.body)
  res.redirect('/start/')
})

app.put('/start/:id', (req, res) => {
  Start[req.params.id] = req.body
  res.redirect('/thread')
})

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
