import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { IRegister } from "../../types/user";
import { useForm } from "react-hook-form";
const Register = (props:IRegister) => {
  console.log(props);
  const onSubmit = (values)=>{ 
    props.onAdd(values)
  }


  return (
    <div>
      <Form
        onFinish={onSubmit}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="User"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your User!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              }
            })
          ]}
        >
          <Input.Password />
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

export default Register;
