import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { handleBasketShow, selectOrder } from "../../redux/slices/CardSlice";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector(selectOrder);
  const quantity = order.length;

  return (
    <div
      onClick={() => dispatch(handleBasketShow())}
      className="cart blue darken-4 white-text"
    >
      <i className="material-icons">shopping_cart</i>
      {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
  );
}

export default Cart;
