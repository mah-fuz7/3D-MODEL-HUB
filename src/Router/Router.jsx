import { createBrowserRouter } from "react-router";
import Rootlayout from "../Layouts/RootLayout";
import Home from "../Page/Home/Home";
import AllProducts from "../Page/AllProducts";
import Register from "../Page/Register";
import Login from "../Page/Login";
import UpdateProduct from "../Page/UpdateProduct";
import AddModal from "../Page/AddModals";
import ProductDetails from "../Page/ProductDetails";
import MyModals from "../Page/MyModals"
import PrivateRouter from "../Private/PrivateRoute";
import Mydownloads from "../Page/Mydownload";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "allproducts",
        element: <PrivateRouter>
          <AllProducts />
        </PrivateRouter>,
      },
      {
        path: "addmodals",
        element: <PrivateRouter>
          <AddModal></AddModal>
        </PrivateRouter>,
      },
      {
        path: "mymodals",
        element: <PrivateRouter>
          <MyModals></MyModals>
        </PrivateRouter>,
      },
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "mydownloads",
        element:<Mydownloads></Mydownloads> ,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "updateproduct/:id",
        element: <PrivateRouter>
          <UpdateProduct />
        </PrivateRouter>,
      },
      {
        path: "productsDetails/:id",
        element:<PrivateRouter>
           <ProductDetails />
        </PrivateRouter>,
      },
    ],
  },
]);

export default router;