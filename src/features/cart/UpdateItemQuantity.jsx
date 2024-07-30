/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreasequantity,
  getitemquantity,
  increasequantity,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaid }) {
  const dispatch = useDispatch();
  const quantity = useSelector(getitemquantity(pizzaid));
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type={"round"}
        onClick={() => dispatch(decreasequantity(pizzaid))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button
        type={"round"}
        onClick={() => dispatch(increasequantity(pizzaid))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
