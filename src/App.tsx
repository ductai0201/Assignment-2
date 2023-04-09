import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ClientLayout from "./pages/Layout/ClientLayout";
import HomePage from "./pages/Client/HomePage";
import ProductPage from "./pages/Client/ProductPage";
import ProductDetails from "./pages/Client/ProductDetails";
import AdminLayout from "./pages/Layout/AdminLayout";
import DashBoard from "./pages/Admin/DashBoard";
import AddProduct from "./pages/Admin/AddProduct";
import { createProduct, getAllProduct, removeProduct, updateProduct } from "./api/products";
import Login from "./pages/Client/Login";
import { IProduct } from "./types/products";
import { ICategory } from "./types/categorys";
import { getAllCategory } from "./api/categorys";
import ProductManagement from "./pages/Admin/ProductManagement";
import Swal from "sweetalert2";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Register from "./pages/Client/Register";
function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categoris, setCategoris] = useState<ICategory[]>([]);
  console.log(products);

  console.log(categoris);
  /*call api products */

  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data));
  }, []);
  /* end products */

  /* Add Product */
  const onHandleAdd = (product: IProduct) => {
    createProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProducts(data))
    );
  };
  /* end Add Product */

  /* remove product */
  const onHandleRemove = (id: number | string) => {
    removeProduct(id)
      .then(() =>
        Swal.fire("Xóa thành công!", "You clicked the button!", "success")
      )
      .then(() => setProducts(products.filter((product) => product._id != id)));
  };
  /* end remove */
  //call api category
  useEffect(() => {
    getAllCategory().then(({ data }) => setCategoris(data));
  }, []);
  //end call

  /*update product */

  const onHandleUpdate = (product:IProduct)=>{
    updateProduct(product).then(()=> getAllProduct().then(({data})=> setProducts(data)))
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> 
          <Route path="products">
            <Route index element={<ProductPage />} />
            <Route path=":id" element={<ProductDetails />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="products">
            <Route
              index
              element={
                <ProductManagement
                  onRemove={onHandleRemove}
                  products={products}
                />
              }
            />
            <Route
              path="add"
              element={<AddProduct category={categoris} onAdd={onHandleAdd} />}
            />
            <Route path=":id" element={<UpdateProduct category={categoris} onUpdate={onHandleUpdate} product={products}/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
