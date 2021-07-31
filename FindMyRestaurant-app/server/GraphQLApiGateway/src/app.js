const express = require('express');
const loaders = require('./loaders');

const app = express();
loaders(app);

const PORT = process.env.PORT;
app.listen(PORT);
console.log("GraphQL api gateway is up on port : "+PORT);
