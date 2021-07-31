const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');

module.exports = app => {
    //logging framework
    app.use(morgan('combined'));
    //parse incoming request into json
    app.use(bodyParser.json({type:'*/*'}));
    app.use(cors());

};
