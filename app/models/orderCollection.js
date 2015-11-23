import Backbone from 'backbone';
import Order from './order';

var OrderCollection = Backbone.Collection.extend({

  model: Order,

  url() {
      return "https://api.parse.com/1/classes/Order";
  }

});

export default OrderCollection;
