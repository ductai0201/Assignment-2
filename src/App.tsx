import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import ClientLayout from "./pages/Layout/ClientLayout";
import HomePage from "./pages/Client/HomePage";
import ProductPage from "./pages/Client/ProductPage";
import ProductDetails from "./pages/Client/ProductDetails";
import AdminLayout from "./pages/Layout/AdminLayout";
import DashBoard from "./pages/Admin/DashBoard";
import AddProduct from "./pages/Admin/Product/AddProduct";
import {
  createProduct,
  getAllProduct,
  removeProduct,
  updateProduct,
} from "./api/products";
import Login from "./pages/Client/Login";
import { IProduct } from "./types/products";
import { ICategory } from "./types/categorys";
import {
  createCategory,
  getAllCategory,
  removeCategory,
  updateCategory,
} from "./api/categorys";
import ProductManagement from "./pages/Admin/Product/ProductManagement";
import Swal from "sweetalert2";
import UpdateProduct from "./pages/Admin/Product/UpdateProduct";
import Register from "./pages/Client/Register";
import CategoryManagement from "./pages/Admin/Category/CategoryManagement";
import AddCategory from "./pages/Admin/Category/AddCategory";
import UpdateCategory from "./pages/Admin/Category/UpdateCategory";
import { IRegister } from "./types/user";
import { register } from "./api/auth";
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
    createProduct(product)
      .then(() => Swal.fire("Good job!", "You clicked the button!", "success"))
      .then(() => getAllProduct().then(({ data }) => setProducts(data)));
  };
  /* end Add Product */

  /* remove product */
  const onHandleRemove = async (id: number | string) => {
    const data = await products.docs.filter((product) => product._id != id);

    Swal.fire({
      title: "Bạn chắn chắn muốn xóa chứ?",
      showDenyButton: true,
      confirmButtonText: "Xóa",
      denyButtonText: `Hủy`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success").then(() =>
          removeProduct(id)
            .then(() => setProducts(data))
            .then(() => getAllProduct().then(({ data }) => setProducts(data)))
        );
      } else if (result.isDenied) {
        Swal.fire("Bạn đã hủy !", "", "info");
      }
    });
  };
  /* end remove product*/

  //call api category
  useEffect(() => {
    getAllCategory().then(({ data }) => setCategoris(data));
  }, []);
  //end call category

  /*update product */

  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProducts(data))
    );
  };

  //end update product

  // update category
  const onHandleUpdateCate = (category: ICategory) => {
    Swal.fire({
      title: "Bạn chắn chắn muốn update chứ?",
      showDenyButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Hủy`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success").then(() =>
          updateCategory(category).then(() =>
            getAllCategory().then(({ data }) => setCategoris(data))
          )
        );
      } else if (result.isDenied) {
        Swal.fire("Bạn đã hủy !", "", "info");
      }
    });
  };
  // end update category

  // remove category
  const onHandleRemoveCategory = async (id: number | string) => {
    const data = await categoris.filter((cate) => cate._id != id);

    Swal.fire({
      title: "Bạn chắn chắn muốn xóa chứ?",
      showDenyButton: true,
      confirmButtonText: "Xóa",
      denyButtonText: `Hủy`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success").then(() =>
          removeCategory(id)
            .then(() => setCategoris(data))
            .then(() => getAllCategory().then(({ data }) => setCategoris(data)))
        );
      } else if (result.isDenied) {
        Swal.fire("Bạn đã hủy !", "", "info");
      }
    });
  };

  // end remove cate

  // add cate
  const onHandleAddCate = (category: ICategory) => {
    createCategory(category).then(() =>
      getAllCategory().then(({ data }) => setCategoris(data))
    );
  };

  // end cate

  // resgister add
  const onHandleAddRegister = (user: IRegister) => {
    register(user).then(() =>
      Swal.fire("Good job!", "You clicked the button!", "success")
    );
  };
  // end register

  // function requireAdminRole() {
  //    const { data: {user: {role} } } = JSON.parse(localStorage.getItem('_user')!) ;
  //   const navigate = useNavigate();
  //   if (role !== 'admin') {
  //     navigate('/login', { replace: true });
  //   }
  // }
  // check role
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route
            path="register"
            element={<Register onAdd={onHandleAddRegister} />}
          />
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
                  categoris={categoris}
                />
              }
            />
            <Route
              path="add"
              element={<AddProduct category={categoris} onAdd={onHandleAdd} />}
            />
            <Route
              path=":id"
              element={
                <UpdateProduct
                  category={categoris}
                  onUpdate={onHandleUpdate}
                  product={products}
                />
              }
            />
          </Route>
          <Route path="categorys">
            <Route
              index
              element={
                <CategoryManagement
                  onRemove={onHandleRemoveCategory}
                  categoris={categoris}
                />
              }
            />
            <Route
              path="add"
              element={<AddCategory onAddCate={onHandleAddCate} />}
            />
            <Route
              path=":id"
              element={
                <UpdateCategory
                  categoris={categoris}
                  onUpdateCate={onHandleUpdateCate}
                />
              }
            />
          </Route>
        
        </Route>
      </Routes>
    </div>
  );
}

export default App;
