var data = require("../../data.json");

exports.view = function(req, res){
    res.render('customer/home', data);
};

exports.view2 = function(req, res){
    res.render('customer/home2', data);
}