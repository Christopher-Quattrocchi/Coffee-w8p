import React from "react";
import Widget from "./Widget.js";
import CartList from "./CartList.js";
import NewOrderForm from "./NewOrderForm.js";
import OrderDetail from "./OrderDetail.js";
import EditOrderForm from "./EditOrderForm.js";
import PriceCalculator from "./PriceCalculator.js";
import { v4 } from 'uuid';

class CartControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOpen: false,
      mainCartList: [],
      selectedOrder: null,
      errorMessage: "",
      editing: false,
      itemData: [
        {
          productType: "arabica",
          description:
            "Sweet, fruity taste. High acidity. The A-list celebrity of coffee beans",
          origin: "Latin America",
          roast: "Medium",
          pricePerUnit: 20,
          inventory: 130
        },
        {
          productType: "robusta",
          description: "Strong, with a bitter, nutty flavor. Less sugar and more caffeine than other beans",
          origin: "Western Africa",
          roast: "Dark",
          pricePerUnit: 25,
          inventory: 130
        },
        {
          productType: "excelsa",
          description: "Tart, fruity. Part of the Liberca family, like its mysterious cousin",
          origin: "Southeast Asia",
          roast: "Light",
          pricePerUnit: 30,
          inventory: 130
        },
      ],
    };
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
        id: v4()
      });

      this.setState({ mainCartList: newMainCartList });
    } else {
      this.setState({ errorMessage: "Can't place order, out of stock" })
    }
  };

  setErrorMessage = (message) => {
    this.setState({ errorMessage: message });
  };

  updateInventory = (productType, newInventory) => {
    const updatedItemData = this.state.itemData.map((item) =>
      item.productType === productType
        ? { ...item, inventory: newInventory }
        : item
    );

    this.setState({ itemData: updatedItemData });

  
    this.props.onInventoryChange(updatedItemData);
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
      roast: selectedItemData ? selectedItemData.roast : ''
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


