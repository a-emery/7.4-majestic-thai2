import Backbone from 'backbone';

var FavoriteCollection = Backbone.Collection.extend({

  url () {
    return "https://api.parse.com/1/classes/Entree";
  },

  parse(response) {
    return response.results;
  }


});

export default FavoriteCollection;
