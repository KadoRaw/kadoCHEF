import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState ={
  items: [],
  totalAmount: 0
}
const cartReducer = (state, action) => {

  if(action.type === 'ADD')
  {
      
      const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;

      const isItemExistIndex = state.items.findIndex(o => o.id === action.item.id);
      const existItem = state.items[isItemExistIndex] ;

      
      let newUpdatedItems;
      if (existItem) {
        const updatedItem = {
          ...existItem,
          amount: existItem.amount + action.item.amount
        }
        newUpdatedItems= [...state.items];
        newUpdatedItems[isItemExistIndex] = updatedItem
      }
      else{
        newUpdatedItems = state.items.concat(action.item);
      }


      return {
        items: newUpdatedItems,
        totalAmount: newTotalAmount
      }
  }
  if(action.type === 'REMOVE')
  {
    const existingItemIndex = state.items.findIndex(o=> o.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let newUpdatedItems;
    if (existingItem.amount === 1) {
      newUpdatedItems = state.items.filter(o=> o.id !== action.id);
    }
    else{
      const updatedItem = {...existingItem, amount : existingItem.amount-1};
      newUpdatedItems = [...state.items];
      newUpdatedItems[existingItemIndex] = updatedItem;
    }
    return {items:newUpdatedItems, totalAmount: updatedTotalAmount}

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
