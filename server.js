const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Start = require('./models/start.js')
const ejs = require('ejs');
const methodOverride = require('method-override')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(methodOverride('_method'))
require('dotenv').config()

const mongodbURI = process.env.MONGODBURI
const PORT = process.env.PORT

app.get('/', ( req, res )=>{
  res.send('!');
});

app.get('/start/new', (req, res) => {
  res.render('new.ejs')
})

app.get('/start', (req, res) => {
  Start.find({}, (error, allThreads) => {
    res.render('index.ejs', {
      start:allThreads
    })
  })
})

app.get('/start/seed', (req, res)=> {
  Start.create ([
    {
      title:  'yeah',
      author: 'manny',
      body:   'im here',
    },
  {
    title:  'wow',
    author: 'manny',
    body:   'yo yo yo',
  }
], (error, data) => {
  res.redirect('/start')
  })
})

app.get('/start/:id', (req,res)=>{
  Start.find({}, (error, allThreads) => {
		res.render('show.ejs', {
			start: allThreads
    })
  })
})

  app.post('/start', (req, res) => {
    Start.create(req.body, (error, createdStart) => {
      if (error) {
        console.log(error)
      }
      else{
        res.redirect('/start/id')
       }
    })
  })
  app.delete('/start/:id', (req, res) =>{
    Start.findByIdAndRemove(req.params.id, (err, threadId)=>{
      if (err){
        console.log(err)
      } else {
        res.redirect('/start/id')
      }
    })
  })
app.get('/start/:id/edit', (req, res) =>{
  Start.findById(req.params.id, (err, threadId) =>{
    res.render('edit.ejs', {
      start: threadId
    })
  })
})

mongoose.connect(mongodbURI ,  { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Database Connected Successfully", mongodbURI))
.catch(err => console.log(err))

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

// app.post('/thread', (req, res) => {
//   Start.push(req.body)
//   res.redirect('/start/')
// })

app.put('/start/:id', (req, res) => {
  Start.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateId) => {    res.redirect('/start/id')
  })
})

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
