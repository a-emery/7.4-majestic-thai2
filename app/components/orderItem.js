import React from 'react';
import _ from 'underscore';

import store from '../store';

var MenuItem = React.createClass({

  getDefaultProps() {
    return {
      order: store.getOrder()
    };
  },

  removeFromOrder() {
    let item = (_.where(this.props.order.toJSON(), {id: this.props.id}));
    item = (this.props.order.get(item[0].id));
    item.clear();
  },

  render() {

    return (
      <div>
      {this.props.name &&
        <div>
          <h3 className="menuItemName">{this.props.name}<button className="menuItemAddButton" onClick={this.removeFromOrder}>-</button></h3>
          <p className="menuItemDescription">{this.props.description} {this.props.price.toFixed(2)}</p>
        </div>
      }
      </div>
    );
  }

});

export default MenuItem;
