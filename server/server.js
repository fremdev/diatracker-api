const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const mongoose = require('./db/mongoose');
const { Record } = require('./models/record');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/record', (req, res) => {
  if (req.body.sugar || req.body.bloodPressure) {
    const record = new Record({
      sugar: req.body.sugar,
      bloodPressure: req.body.bloodPressure,
    });

    record.save().then((doc) => {
      res.send(doc);
    })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    res.status(400).send('The record should have at least one field');
  }
});

app.get('/records', (req, res) => {
  Record.find()
    .then((records) => {
      res.send({ records });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get('/records/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Record.findById(id)
    .then((record) => {
      if (!record) {
        return res.status(404).send();
      }
      res.send({ record });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

module.exports = { app };
