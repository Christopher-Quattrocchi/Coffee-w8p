import React from "react";
import Order from "./Order.js";
import PropTypes from "prop-types";


function CartList(props){


  return (
    <React.Fragment>
      {props.cartList.map((order) =>
        <Order
          whenOrderClicked = { props.onOrderSelection }
          quantity={order.quantity}
          item={order.item}
          description={order.description}
          origin={order.origin}
          roast={order.roast}
          inventory={order.inventory}
          id={order.id}
          key={order.id}/>
      )}
    </React.Fragment>
  );
}

CartList.propTypes = {
  cartList: PropTypes.array,
  onOrderSelection: PropTypes.func
};

export default CartList;