/**
 * Created by kenmiyachi on 11/10/16.
 */
/**
 * Created by kenmiyachi on 11/10/16.
 */
var users = require('../users.json');

exports.view = function(req, res){
    res.render('paymentinfo',users);
};