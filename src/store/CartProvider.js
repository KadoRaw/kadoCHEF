import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState ={
  items: [],
  totalAmount: 0
}
const cartReducer = (state, action) => {

  if(action.type === 'ADD')
  {
      const updatedItems = state.items.concat(action.item);
      const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        totalAmount: newTotalAmount
      }
  }
  if(action.type === 'REMOVE')
  {

  }


  return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState, dispathgCartAct]=useReducer(cartReducer, defaultCartState);

    const addItemHandler = item =>{
      dispathgCartAct({type: 'ADD', item: item})
    };

    const removeItemHandler = id =>{
      dispathgCartAct({type: 'REMOVE', id: id})
    };
    
    const cartContext ={
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
      };


  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
