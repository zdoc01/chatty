
/**
 * GET home page.
 * 
 * @api
 */
exports.index = function(req, res){
  res.render('index', { title: 'chatty' });
};