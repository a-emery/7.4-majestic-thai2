import React from 'react';
import { Link, IndexLink } from 'react-router';
import store from '../store';
import Sticky from 'react-sticky';
import moment from 'moment';

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

  getInitialState() {
    return {
      submitted: false,
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

  saveOrder() {
    var order = [];
    this.props.order.toJSON().map((i)=> {
      if(i.name){
        order = order.concat({name: i.name, price: i.price});
      }
    });
    store.submitOrder({
      order: order,
      timeSubmitted: moment().format('MMMM Do YYYY, h:mm:ss a'),
      total: this.totalPrice()
    });
    this.props.order.fetch();
    this.setState({
      submitted: false
    });
  },

  toggleConfirm() {
    if(!this.state.submitted){
      this.setState({
        submitted: true
      });
    } else if (this.state.submitted){
      this.setState({
        submitted: false
      });
    }
  },

  render() {
    this.total = this.totalPrice() || "";
    return (
      <div>
        <header className="headerContainer">
          <h1 className="headerTitle">Majestic Thai</h1>
          <h4 className="headerSubtitle">est. 2015</h4>
          <ul className="headerList">
            <li className="headerListItem active"><a href="">Menu</a></li>
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
        {this.state.submitted &&
          <div className="confirmContainer">
            <div className="confirmBox">
                <h2>Confirm Order:</h2>
                {this.props.order.toJSON().map((o)=><div key={Math.random()}><OrderItem {...o} order={this.props.order} /></div>)}
                <p>Total: {this.total}</p>
                <button onClick={this.saveOrder}>Submit Order</button>
                <button className="confirmBoxCancel" onClick={this.toggleConfirm}>Cancel</button>
            </div>
          </div>
        }
        <Sticky className="orderContainer" stickyClass="orderContainerSticky" stickyStyle={{}}>
          <div>
            <h2>Current Order:</h2>
            {this.props.order.toJSON().map((o)=><div key={Math.random()}><OrderItem {...o} order={this.props.order} /></div>)}
            <p>Total: {this.total}</p>
            <button onClick={this.toggleConfirm}>Submit Order</button>
          </div>
        </Sticky>
      </div>
    );
  }

});

export default App;
