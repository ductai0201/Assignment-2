import React, { useState } from "react";
import { Space, Table, Tag, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Form, Link, NavLink } from "react-router-dom";
import { IProduct } from "../../../types/products";

interface DataType {
  key: string | number;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  createdAt: string;
  image: string;
}

interface Iprops {
  products: IProduct[];
  onRemove: (id: number) => void;
}

const ProductManagement = (props: Iprops) => {
  const [searchText, setSearchText] = useState("");
  
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => <img src={image} alt={record.name} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" ghost>
            <Link to={`/admin/products/${record.key}`}>Update</Link>
          </Button>
          <Button
            type="primary"
            danger
            ghost
            onClick={() => props.onRemove(record.key)}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] =
    Array.isArray(props.products.docs) &&
    props.products.docs.map((item: IProduct) => {
      return {
        key: item._id,
        name: item.name,
        price: item.price,
        description: item.description,
        categoryId: item.categoryId,
        createdAt: item.createdAt,
        image: item.image,
      };
    });

    const filteredData = Array.isArray(data) && data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div style={{ marginBottom: "10px", display: "flex" }}>
        <Button type="primary">
          <Link to={`/admin/products/add`}>Add Product</Link>
        </Button>
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginLeft: "10px", width: 200 }}
        />
        <Button type="primary" style={{ marginLeft: "10px" }}>
          Search
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 3 }} />
    </>
  );
};

export default ProductManagement;
