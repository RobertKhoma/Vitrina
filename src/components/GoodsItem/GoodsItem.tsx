import type { IGoodsItemProps } from "./GoodsItem.props";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../../redux/slices/CardSlice";


function GoodsItem({
  mainId,
  displayName,
  displayDescription,
  price,
  displayAssets,
}: IGoodsItemProps) {
    const priceProduct = price.regularPrice;

  let imageGoods: string = '';
  
  const dispatch = useDispatch()
/* console.log(mainId);
console.log(displayName); */



  if (displayAssets && displayAssets.length > 0) {
    imageGoods = displayAssets[0].full_background;
  } else {
    imageGoods = ''
  }
  return (
    <div>
      <div className="card">
        <div className="card-image">
          <img alt={displayName} src={imageGoods} />
        </div>
        <div className="card-content">
          <span className="card-title">{displayName}</span>
          {displayDescription && <p>{displayDescription}</p>}
        </div>
        <div className="card-action">
          <button onClick={()=> dispatch(handleAddToCart({
            id: mainId,
            displayName,
            priceProduct
          }))} className="btn">Buy</button>
          <span className="right card__price">{priceProduct} Euro.</span>
        </div>
      </div>
    </div>
  );
}

export default GoodsItem;
