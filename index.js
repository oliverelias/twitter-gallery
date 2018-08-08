const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const app = express();


app.get('/authenticate', (req, res) => {
    res.send('Hello World!');
  });
};

app.listen(5000);
