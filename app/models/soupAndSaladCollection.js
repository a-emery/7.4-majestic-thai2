import Backbone from 'backbone';

var SoupAndSaladCollection = Backbone.Collection.extend({

  url () {
    return "https://api.parse.com/1/classes/SoupAndSalad";
  },

  parse(response) {
    return response.results;
  }


});

export default SoupAndSaladCollection;
