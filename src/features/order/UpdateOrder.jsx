/* eslint-disable react/prop-types */
import { useFetcher, useNavigate } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// async function updatepriority() {
//     const updatedorder = {
//       ...order,
//       priority: true,
//     };
//     const data = await updateOrder(order.id, updatedorder);
//     navigate(`/order/${data.data.id}`);
//   }

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type={"primary"}>Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderid, data);
  return null;
}

export default UpdateOrder;
