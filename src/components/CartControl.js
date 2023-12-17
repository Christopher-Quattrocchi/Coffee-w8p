import React from "react";
import Widget from "./Widget.js";
import CartList from "./CartList.js";
import NewOrderForm from "./NewOrderForm.js";
import OrderDetail from "./OrderDetail.js";
import EditOrderForm from "./EditOrderForm.js";
import PriceCalculator from "./PriceCalculator.js";
import { v4 } from 'uuid';
import arabica from "../img/arabica.jpg";
import robusta from "../img/robusta.jpg";
import excelsa from "../img/excelsa.jpg";


class CartControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOpen: false,
      mainCartList: [],
      selectedOrder: null,
      errorMessage: "",
      editing: false,
      itemData: this.props.inventory
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.inventory !== this.props.inventory) {
      this.setState({ itemData: this.props.inventory });
    }
  }

  handleEditClick = () => {
    // console.log("handleEditClick!!");
    this.setState({ editing: true });
  };

  handleNewOrderCreation = (newOrder) => {
    const selectedItem = this.state.itemData.find(item => item.productType === newOrder.item);
    if (selectedItem && newOrder.quantity <= selectedItem.inventory) {
      const updatedInventory = selectedItem.inventory - newOrder.quantity;
      this.updateInventory(newOrder.item, updatedInventory);

      const newMainCartList = this.state.mainCartList.concat({
        ...newOrder,
        id: v4(),
        image: selectedItem.image || arabica
      });

      this.setState({ mainCartList: newMainCartList });
    } else {
      this.setState({ errorMessage: "Can't place order, out of stock" });
    }
  };

  setErrorMessage = (message) => {
    this.setState({ errorMessage: message });
  };

  updateInventory = (productType, newInventory) => {
    this.setState(prevState => ({
      itemData: prevState.itemData.map(item =>
        item.productType === productType
          ? { ...item, inventory: newInventory }
          : item
      )
    }), () => {

      this.props.onInventoryChange(this.state.itemData);
    });
  };



  toggleCartVisibility = () => {
    if (this.state.selectedOrder != null) {
      this.setState({
        cartOpen: false,
        selectedOrder: null,
      });
    } else {
      this.setState((oldState) => ({
        cartOpen: !oldState.cartOpen,
      }));
    }
  };

  handleAddingNewOrderToList = (newOrder) => {
    const newMainCartList = this.state.mainCartList.concat(newOrder);
    this.setState({ mainCartList: newMainCartList, cartOpen: false });
  };

  handleChangingSelectedOrder = (id) => {
    const selectedOrder = this.state.mainCartList.filter((order) => order.id === id)[0];
    const selectedItemData = this.state.itemData.find(item => item.productType === selectedOrder.item);

    const updatedSelectedOrder = {
      ...selectedOrder,
      origin: selectedItemData ? selectedItemData.origin : '',
      roast: selectedItemData ? selectedItemData.roast : '',
      image: selectedItemData ? selectedItemData.image : null
    }

    this.setState({ selectedOrder: updatedSelectedOrder });
  };

  handleEditingOrderInList = (orderToEdit) => {
    const editedMainCartList = this.state.mainCartList.map((order) =>
      order.id === orderToEdit.id ? { ...order, ...orderToEdit } : order
    );
    this.setState({
      mainCartList: editedMainCartList,
      editing: false,
      selectedOrder: null,
    })
  }


  handleDeletingOrder = (id) => {
    const newMainCartList = this.state.mainCartList.filter(
      (order) => order.id !== id
    );
    this.setState({
      mainCartList: newMainCartList,
      selectedOrder: null,
    });
  };

  render() {
    console.log("Main Cart List:", this.state.mainCartList);


    const cartStyles = {
      // backgroundColor: "#61dafb",
      textAlign: "center"
    }


    let currentView = null;
    if (this.state.editing === true) {
      currentView = (
        <EditOrderForm
          order={this.state.selectedOrder}
          onEditOrder={this.handleEditingOrderInList}
          itemData={this.state.itemData}
        />
      );
    } else if (this.state.selectedOrder != null) {
      currentView = (
        <React.Fragment>
          <OrderDetail
            order={this.state.selectedOrder}
            onClickingDelete={this.handleDeletingOrder}
            onClickingEdit={this.handleEditClick}
            onClickingBackToCart={this.toggleCartVisibility}
          />
        </React.Fragment>
      );
    } else if (this.state.cartOpen === false) {
      currentView = (
        <NewOrderForm
          inventory={this.props.inventory}
          onNewOrderCreation={this.handleAddingNewOrderToList}
          updateInventory={this.updateInventory}
          itemData={this.state.itemData}
          errorMessage={this.state.errorMessage}
          setErrorMessage={this.setErrorMessage}
        />
      );
    } else {
      currentView = (
        <React.Fragment>

          <div style={cartStyles}>
            <h3>Your Cart</h3>
            <CartList
              cartList={this.state.mainCartList}
              onOrderSelection={this.handleChangingSelectedOrder}
            />
            <PriceCalculator
              cartList={this.state.mainCartList}
              itemData={this.state.itemData}
            />
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Widget
          itemCount={this.state.mainCartList.length}
          onClickEvent={this.toggleCartVisibility}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <hr />
        {currentView}
      </React.Fragment>
    );
  }
}

export default CartControl;


