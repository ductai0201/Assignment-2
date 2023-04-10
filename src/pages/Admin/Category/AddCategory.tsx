import React, { useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { IProduct } from "../../../types/products";
import { IOnAdd } from "../../../types/handle";
import { ICategory } from "../../../types/categorys";

const { Option } = Select;

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface AddCategoryProps extends IOnAdd {
  category: ICategory;
}


const AddCategory: React.FC<AddCategoryProps> = ({onAddCate,category}) => {
  console.log(onAddCate);
  console.log(category);
  const onFinish = (values: IProduct) => {
    onAddCate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 800}}
      >
        <Form.Item
          name="name"
          label="Name Category"
          rules={[
            {
              type: "string",
              message: "The input is not valid Name!",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategory;
