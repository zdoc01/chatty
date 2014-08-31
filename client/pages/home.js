var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'Chatty - Home',
    template: templates.pages.home
});