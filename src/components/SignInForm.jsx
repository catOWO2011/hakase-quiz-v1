import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signInUser } from "../features/user/usersSlice";

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;

    await dispatch(
      signInUser({
        email,
        password,
      })
    );

    navigate(`/`);
  };

  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  return (
    <Row className="w-full flex justify-center items-center">
      <Col span={12}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{
            span: 6,
          }}
        >
          <Form.Item
            label={<span className="text-xl font-semibold">Email</span>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="text-xl font-semibold">Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit"
              className="rounded-md bg-[#AD88C6] text-lg h-full font-medium text-white"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
