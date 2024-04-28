
import mudkip from "../assets/mudkip.png";

export const Product = ({details, purchase, owned}) => {

  let purchaseStatus;
  if (owned) {
    purchaseStatus = <p>Already owned! Check your collection to view :)</p>;
  } else {
    purchaseStatus = <button className="purchase-button" onClick={() => purchase(details)}>Purchase</button>;
  }

  return (
    <div className="product">
      <p><strong>{details.name}</strong></p>
      <p>Price: {details.price}</p>
      <img src={mudkip} alt={`Sample rendering of the product, a ${details.name}.`} className="product-preview"/>
      {purchaseStatus}
    </div>
  )
}