import React, { useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { IProduct } from "../../types/products";
import { IOnAdd } from "../../types/handle";
import { ICategory } from "../../types/categorys";

const { Option } = Select;

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface AddProductProps extends IOnAdd {
  category: ICategory;
}


const AddProduct: React.FC<AddProductProps> = ({onAdd,category}) => {
  console.log(onAdd);
  console.log(category);
  const onFinish = (values: IProduct) => {
    onAdd(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 800 }}
      >
        <Form.Item
          name="name"
          label="Name Product"
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
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              type: "number",
              message: "The input is not valid Price!",
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Dragger">
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Please select a country">
            {category.map((item:any,index:number) => (
              <Option key={index} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
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

export default AddProduct;
