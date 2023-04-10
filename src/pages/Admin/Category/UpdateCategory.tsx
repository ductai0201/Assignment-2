import React, { useEffect, useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { IProduct } from "../../../types/products";
import { IOnUpdate } from "../../../types/handle";
import { ICategory } from "../../../types/categorys";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface UpdateCateProps {
  categoris: number
  onUpdateCate: ICategory;
}

const UpdateCategory: React.FC<UpdateCateProps> = ({ categoris,onUpdateCate }) => {
  
  const { id } = useParams();

  const [Category, setCategory] = useState<ICategory>();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const currentProduct =
      Array.isArray(categoris) && categoris.find((cate) => cate._id == id);
    setCategory(currentProduct);
  }, [Category]);

  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: Category?._id,
      name: Category?.name,
    });
  };

  useEffect(() => {
    setFields();
  }, [Category]);

  const onFinish = (values: ICategory) => {
    onUpdateCate(values);
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

export default UpdateCategory;
