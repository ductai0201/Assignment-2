import React from "react";
import { Space, Table, Tag, Button } from "antd";
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
            onClick={()=>props.onRemove(record.key)}
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

  return (
    <>
      <div style={{ marginBottom: "10px", display: "flex" }}>
        <Button type="primary"><Link to={`/admin/categorys/add`}>Add Category</Link></Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 3 }} />
    </>
  );
};

export default CategoryManagement;
