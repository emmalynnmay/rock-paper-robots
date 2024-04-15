
export const Product = ({details, purchase}) => {

  return (
    <div className="product">
      <p>{details.name}</p>
      <p>{details.price}</p>
      <button className="button" onClick={() => purchase(details)}>Purchase</button>
    </div>
  )
}