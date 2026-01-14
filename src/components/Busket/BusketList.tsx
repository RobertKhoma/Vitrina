import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { handleBasketShow, handleDeleteItemFromCart, handleIncQuantity, selectOrder } from "../../redux/slices/CardSlice";

function BusketList() {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector(selectOrder);
  /* console.log(order); */
  const totalPrice: number = order.reduce((akkum, item) => {
    return (akkum += item.priceProduct * item.quantity);
  }, 0);

  return (
    <ul className="collection basket-list">
      <li className="collection-item active">Busket</li>
      {order.length ? (
        order.map((item) => (
          <li className="collection-item ">
            <span className="collection-item__span">{item.displayName}</span>
            <i className="material-icons">remove_circle</i>x{item.quantity}
            <i onClick={()=>dispatch(handleIncQuantity(item.id))} className=" material-icons">add_box</i>=
            {item.priceProduct * item.quantity}
            <span className="secondary-content">
              <i onClick={()=>dispatch(handleDeleteItemFromCart(item.id))} className="material-icons basket-delete">close</i>
            </span>
          </li>
        ))
      ) : (
        <li className="collection-item ">Cart is messiing</li>
      )}
      <li className="collection-item active">total price {totalPrice}</li>
      <li className="collection-item">
        <button className="btn btn-small">To arrange</button>
      </li>
      <i
        onClick={() => dispatch(handleBasketShow())}
        className="material-icons basket-close"
      >
        close
      </i>
    </ul>
  );
}

export default BusketList;


///додати закінчсити ремове зменшит товар