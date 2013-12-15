
/**
 * GET home page.
 * 
 * @api
 */
exports.index = function(req, res){
  res.render('home', { title: 'chatty' });
};