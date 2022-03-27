import React,{useContext , useEffect , useState} from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {

  const cartCtx = useContext(CartContext);
  const numberItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const [isBumped, setBumped] = useState(false);

  const btnClasses = `${classes.button} ${isBumped ? classes.bump : ''}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBumped(true);
    const timer = setTimeout(()=>{setBumped(false)},300);
    return () =>{clearTimeout(timer)};
  },[cartCtx.items]);

  return (
    
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberItems}</span>
    </button>
  );
};

export default HeaderCartButton;
