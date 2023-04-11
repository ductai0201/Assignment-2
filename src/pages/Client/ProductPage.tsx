import React from "react";
import { Link } from "react-router-dom";

const ProductPage = (props) => {
  return (
    <div style={{ display: "flex" }}>
      {Array.isArray(props.products.docs) &&
        props.products.docs.map((item) => {
          const dataCate = props.categoris.map((cate) => cate);
          const findData = dataCate.find((data) => data._id == item.categoryId);
          const nameCate = findData ? findData.name : "";
          return (
            <div key={item._id}>
              <p>
                <img src="https://picsum.photos/seed/picsum/200/200" alt="" />
              </p>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <p>{nameCate}</p>
            </div>
          );
        })}
    </div>
  );
};

export default ProductPage;
