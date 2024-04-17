
import mudkip from "../assets/mudkip.png";

export const Product = ({details, purchase}) => {

  return (
    <div className="product">
      <p><strong>{details.name}</strong></p>
      <p>Price: {details.price}</p>
      <img src={mudkip} alt={`Sample rendering of the product, a ${details.name}.`} className="product-preview"/>
      <button className="purchase-button" onClick={() => purchase(details)}>Purchase</button>
    </div>
  )
}