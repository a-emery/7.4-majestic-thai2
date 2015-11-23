import EntreeCollection from './models/entreeCollection';
import SoupAndSaladCollection from './models/soupAndSaladCollection';
import OrderCollection from './models/orderCollection';

var entrees = new EntreeCollection();
var soupsAndSalads = new SoupAndSaladCollection();
var order = new OrderCollection();

export default {

  getEntrees() {
    return entrees;
  },

  getSoupsAndSalads() {
    return soupsAndSalads;
  },

  getOrder() {
    return order;
  },

  submitOrder(newOrder) {
    // console.log(order);
    order.create(newOrder);
  },

  resetOrder() {
    var order = new OrderCollection();
  }

};
