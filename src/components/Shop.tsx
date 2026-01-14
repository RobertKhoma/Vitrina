import { useGetProductsQuery } from "../services/products";
import { Preloader } from "./Preloader";
import GoodsItem from "./GoodsItem/GoodsItem";
import BusketList from "./Busket/BusketList";
import Cart from "./Cart/Cart";
import { useSelector } from "react-redux";
import { selectIsBasketShow } from "../redux/slices/CardSlice";

function Shop() {
  const { data: goods = [], isLoading, isError } = useGetProductsQuery();
  const isBasketShow = useSelector(selectIsBasketShow)
 

  //console.log(goods);

  if (isLoading) return <Preloader />;
  if (isError) return <div>Error loading products</div>;
  if (!goods.length) {
    return <h3>Nothing here</h3>;
  }
  return (
    <main className="container content">
      <div className="card-total">
        Total products:
        <span className="card-total__weight"> {goods.length}</span>
      </div>
      <div className="goods">
        {goods.slice(0, 20).map((item) => (
          <GoodsItem key={item.mainId} {...item} />
        ))}
      </div>
{isBasketShow && <BusketList/> }
<Cart/>
    </main>
  );
}

export { Shop };
