var users = require('../users.json');
var _ = require('lodash');
//var bodyParser = require('body-parser');

exports.view = function(req, res){
    res.render('index');
};
