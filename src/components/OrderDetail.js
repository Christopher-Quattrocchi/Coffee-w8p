import React from "react";
import PropTypes from "prop-types";
// import album from "../img/album.jpg";
// import shirt from "../img/Tshirt.png";
// import button from "../img/button.jpg";
import arabica from "../img/arabica.jpg";
import robusta from "../img/robusta.jpg";
import excelsa from "../img/excelsa.jpg";

function OrderDetail(props){
console.log("Order in OrderDetail:", props.order);
  let imageSrc;
  if (props.order.image) {
    imageSrc = props.order.image;
  };
  
  const itemStyling = {
    textAlign: "left",
    marginLeft: "30%",
    marginRight: "30%",
    borderStyle: "solid",
    padding: "10px"
  };

  const imageStyle = {
    width: "200px",
    height: "auto"
  }

  const alignmentCenter = {
    // backgroundColor: "#61dafb",
    textAlign: "center"
  }
  
  let input;
  const { order, onClickingDelete } = props;
  if (order.item === "arabica") {
    input = arabica;
  } else if (order.item === "robusta") {
    input = robusta;
  } else if (order.item === "excelsa") {
    input = excelsa;
  }
  const altAttribute = `image of ${input}`;
  return (
    <React.Fragment>
      <div style={alignmentCenter}>
        <h3>Order Detail</h3>
        <div style={itemStyling}>
          <h4>Item: {order.item}</h4>
          <p>Quantity: {order.quantity}</p>
          <p>Origin: {order.origin}</p>
          <p>Roast: {order.roast}</p>
          <img 
          src={order.image} 
          alt= {`Image of ${order.item}`} 
          style={imageStyle}/>
          <p>Description: {order.description}</p>
          <div style={alignmentCenter}>
            <button onClick={props.onClickingEdit}>Update Order</button>
            <button onClick={()=> onClickingDelete(order.id) }>Close Order</button>
          </div>
        </div>
        <hr/>
        <button onClick={props.onClickingBackToCart}>Return to Cart</button>
      </div>
    </React.Fragment>
  );
}

OrderDetail.propTypes = {
  order: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingBackToCart: PropTypes.func
};

export default OrderDetail;