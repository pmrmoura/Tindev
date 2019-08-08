const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();

mongoose.connect('mongodb+srv://pedro:pedro@cluster0-pdfmt.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json()); // diz pro express que vamos usar json
server.use(routes);

server.listen(3333);
