import Backbone from 'backbone';

var EntreeCollection = Backbone.Collection.extend({

  url() {
      return "https://api.parse.com/1/classes/Order";
  }

});

export default EntreeCollection;
