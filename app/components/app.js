import React from 'react';
import { Link, IndexLink } from 'react-router';
import store from '../store';
import Sticky from 'react-sticky';

import MenuItem from '../components/menuItem';
import OrderItem from '../components/orderItem';

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      entrees: store.getEntrees(),
      soupsAndSalads: store.getSoupsAndSalads(),
      order: store.getOrder()
    };
  },

  componentWillMount() {
    this.props.entrees.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.entrees.fetch();
    this.props.soupsAndSalads.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.soupsAndSalads.fetch();
    this.props.order.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.order.fetch();
  },

  totalPrice() {
    var total = 0;
    for (var i = 0; i < this.props.order.toJSON().length; i++ ) {
      if (this.props.order.toJSON()[i].price) {
        total += (Number(this.props.order.toJSON()[i].price));
      }
    }
    return total.toFixed(2);
  },

  render() {
    this.total = this.totalPrice() || "";
    return (
      <div>
        <header className="headerContainer">
          <h1 className="headerTitle">Majestic Thai</h1>
          <h4 className="headerSubtitle">est. 2015</h4>
          <ul className="headerList">
            <li className="headerListItem"><a href="">Menu</a></li>
            <li className="headerListItem"><a href="">Reservations</a></li>
            <li className="headerListItem"><a href="">Events</a></li>
            <li className="headerListItem"><a href="">Contact</a></li>
          </ul>
        </header>
        <div className="subHeaderBanner"></div>
        <div className="menuContainer">
          <div className="menuGroupContainer">

          </div>
          <div className="menuGroupContainer">
            <h2>Soups and Salads:</h2>
            {this.props.soupsAndSalads.toJSON().map((e)=><MenuItem key={e.objectId} {...e}/>)}
          </div>
          <div className="menuGroupContainer">
            <h2>Entrees:</h2>
            {this.props.entrees.toJSON().map((e)=><MenuItem key={e.objectId} {...e}/>)}
          </div>
          <div className="menuGroupContainer">

          </div>
        </div>
        <Sticky className="orderContainer" stickyClass="orderContainerSticky" stickyStyle={{}}>
            <h2>Current Order:</h2>
            {this.props.order.toJSON().map((o)=><OrderItem key={Math.random()} {...o}/>)}
            <p>Total: {this.total}</p>
        </Sticky>
      </div>
    );
  }

});

export default App;