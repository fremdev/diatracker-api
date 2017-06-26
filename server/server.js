const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const { Record } = require('./models/record');

const app = express();
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

app.listen(3000, () => {
  console.log('Listen on port 3000');
});

module.exports = { app };
