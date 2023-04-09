import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { IRegister } from "../../types/user";
import { useForm } from "react-hook-form";
const Register = () => {
  const { register, handleSubmit,watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const password = watch("password", "");
    console.log(password);
    

  return (
    <div>
      <Form
        onFinish={handleSubmit(onSubmit)}
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
          <Input {...register("name")}/>
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
          <Input {...register("email")}/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password {...register("password")}/>
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input your confirm password!" },
            {
              validator: (_, value) =>
                value == password ? Promise.resolve() : Promise.reject(new Error("The two passwords do not match!")),
            },
          ]}
        >
          <Input.Password {...register("confirmPassword")}/>
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
