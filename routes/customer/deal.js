var data = require('../../data.json');
var _ = require('lodash');
var $ = require('jquery');

exports.view = function(req, res){
    var queries = req.query;
    var retailer = _.find(data.offers, {'name': queries.name, 'offer': queries.offer});

    res.render('customer/deal', retailer);
};
