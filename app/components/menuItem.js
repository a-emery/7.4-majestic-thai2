import React from 'react';

import store from '../store';

var MenuItem = React.createClass({

  getDefaultProps() {
    return {
      order: store.getOrder()
    };
  },

  addToOrder() {
    this.props.order.add({name: this.props.name, price: this.props.price, id: Math.random()});
  },

  render() {
    return (
      <div>
        <h3 className="menuItemName">{this.props.name}<button className="menuItemAddButton" onClick={this.addToOrder}>+</button></h3>
        <p className="menuItemDescription">{this.props.description} {this.props.price.toFixed(2)}</p>
      </div>
    );
  }

});

export default MenuItem;
