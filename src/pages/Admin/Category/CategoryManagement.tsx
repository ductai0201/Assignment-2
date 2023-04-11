import React, { useState } from "react";
import { Space, Table, Tag, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, NavLink } from "react-router-dom";
import { ICategory } from "../../../types/categorys";

interface DataType {
  key: string | number;
  name: string;
  numberOfPrice: number;
  createdAt: string;
}

const CategoryManagement = (props: ICategory) => {
  console.log(props);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Number of Product",
      dataIndex: "numberOfPrice",
      key: "numberOfPrice",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" ghost>
            <Link to={`/admin/categorys/${record.key}`}>Update</Link>
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
    Array.isArray(props.categoris) &&
    props.categoris.map((item: ICategory) => {
      return {
        key: item._id,
        name: item.name,
        numberOfPrice: item.products.length,
        createdAt: item.createdAt,
      };
    });

  const filteredData =
    Array.isArray(data) &&
    data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <>
      <div style={{ marginBottom: "10px", display: "flex" }}>
        <Button type="primary">
          <Link to={`/admin/categorys/add`}>Add Category</Link>
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

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 3 }}
      />
    </>
  );
};

export default CategoryManagement;
