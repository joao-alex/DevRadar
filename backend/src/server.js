const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://devradar:devradar@cluster0-gvztr.mongodb.net/devradar?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3334);