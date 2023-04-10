import React, { useEffect, useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { IProduct } from "../../types/products";
import { IOnUpdate } from "../../types/handle";
import { ICategory } from "../../types/categorys";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const { Option } = Select;

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface UpdateProductProps extends IOnUpdate {
  product: IProduct;
  category: ICategory;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
  category,
  onUpdate,
  product,
}) => {
  const { id } = useParams();
  
  const [Product, setProduct] = useState<IProduct>();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const currentProduct =
      Array.isArray(product.docs) && product.docs.find((prd) => prd._id == id);
    setProduct(currentProduct);
  }, [Product]);

  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: Product?._id,
      name: Product?.name,
      price: Product?.price,
      categoryId: Product?.categoryId,
      description: Product?.description,
    });
  };

  useEffect(() => {
    setFields();
  }, [Product]);

  const onFinish = (values: IProduct) => {
    onUpdate(values);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 800 }}
      >
        <Form.Item
          label=""
          name="_id"
          style={{ display: "none" }} // ẩn input này đi
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
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
          rules={[{ required: true, message: "Please select your category!" }]}
        >
          <Select placeholder="Please select a category">
            {category.map((item: any, index: number) => (
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

export default UpdateProduct;
