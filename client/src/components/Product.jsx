
import mudkip from "../assets/mudkip.png";
import apple from "../assets/previews/apple.png";
import cactus from "../assets/previews/cactus.png";
import candy from "../assets/previews/candy.png";
import duck from "../assets/previews/duck.png";
import lightning from "../assets/previews/lightning.png";
import penguin from "../assets/previews/penguin.png";
import rubberduck from "../assets/previews/rubber-duck.png";
import strawberry from "../assets/previews/strawberry.png";
import target from "../assets/previews/target.png";

export const Product = ({details, purchase, owned}) => {

  let purchaseStatus;
  if (owned) {
    purchaseStatus = <p>Already owned! Check your collection to view :)</p>;
  } else {
    purchaseStatus = <button className="purchase-button" onClick={() => purchase(details)}>Purchase</button>;
  }

  function getPicture(name) {
    if (name === 'Apple') {
      return <img src={apple} alt={`Sample rendering of the product, a ${name}.`} className="product-preview"/>

    } else if (name === 'Cactus') {
      return <img src={cactus} alt={`Sample rendering of the product, a ${name}.`} className="product-preview"/>

    } else if (name === 'Candy') {
      return <img src={candy} alt={`Sample rendering of the product, a ${name}.`} className="product-preview"/>

    } else if (name === 'Duck') {
      return <img src={duck} alt={`Sample rendering of the product, a ${name}.`} className="product-preview"/>

    } else if (name === 'Lightning') {
      return <img src={lightning} alt={`Sample rendering of the product, a ${name}.`} className="product-preview"/>

    } else if (name === 'Penguin') {
      return <img src={penguin} alt={`Sample rendering of the product, a ${name}.`} className="product-preview"/>

    } else if (name === 'Rubber Duck') {
      return <img src={rubberduck} alt={`Sample rendering of the product, a ${name}.`} className="product-preview"/>

    } else if (name === 'Strawberry') {
      return <img src={strawberry} alt={`Sample rendering of the product, a ${name}.`} className="product-preview"/>

    } else if (name === 'Target') {
      return <img src={target} alt={`Sample rendering of the product, a ${name}.`} className="product-preview"/>

    }
  }

  return (
    <div className="product">
      <p><strong>{details.name}</strong></p>
      <p>Price: {details.price}</p>
      {getPicture(details.name)}
      {purchaseStatus}
    </div>
  )
}