const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
var fs = require('fs');
var url = fs.readFileSync('mongoinfo.txt', 'utf-8');

mongoose.connect(url, {
  useNewUrlParser: true
});

const multer = require('multer')
const photo = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const video = multer({
  dest: '../front-end/public/videos/',
  limits: {
    fileSize: 10000000
  }
})

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  path: String,
  type: String,
});

const descSchema = new mongoose.Schema({
  title: String,
  description: String,
})

const Item = mongoose.model('Item', itemSchema);
const Description = mongoose.model('Description', descSchema);

app.post('/api/photos', photo.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/videos', video.single('video'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  console.log(req.file.filename);
  res.send({
    path: "/videos/" + req.file.filename
  });
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
    type: req.body.type,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    var item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.description = req.body.description;
    item.type = req.body.type;
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/descriptions', async (req, res) => {
  const desc = new Description({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await desc.save();
    res.send(desc);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/descriptions', async (req, res) => {
  try {
    let descriptions = await Description.find();
    res.send(descriptions);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/descriptions/:id', async (req, res) => {
  try {
    var desc = await Description.findOne({
      _id: req.params.id
    });
    desc.title = req.body.title;
    desc.description = req.body.description;
    await desc.save();
    res.send(desc);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
