import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

// import Home from "./ui/Home";
// import Menu from "./features/menu/Menu";
// import Cart from "./features/cart/Cart";
// import Order from "./features/order/Order";
// import CreateOrder from "./features/order/CreateOrder";
// import AppLayout from "./ui/AppLayout";
import Loader from "./ui/Loader";
import Error from "./ui/Error";
const Home = lazy(() => import("./ui/Home"));
const Menu = lazy(() => import("./features/menu/Menu"));
const Cart = lazy(() => import("./features/cart/Cart"));
const Order = lazy(() => import("./features/order/Order"));
const CreateOrder = lazy(() => import("./features/order/CreateOrder"));
const AppLayout = lazy(() => import("./ui/AppLayout"));
import { loader as menuloader } from "./features/menu/Menu";
import { loader as orderloader } from "./features/order/Order";
import { action as neworderform } from "./features/order/CreateOrder";
import { action as updateorderform } from "./features/order/UpdateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuloader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: neworderform,
      },
      {
        path: "/order/:orderid",
        element: <Order />,
        loader: orderloader,
        errorElement: <Error />,
        action: updateorderform,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
