
import { RenderModel } from "../routes/RenderModel.jsx";

export const Item = ({details}) => {

  return (
    <div className="product">
      <p>{details.name}</p>
      <RenderModel/>
    </div>
  )
}