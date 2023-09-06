// Login.js
import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/images/logo.jpeg';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Received values:", values);
    const {success, result} = await login(values);
    console.log(result)
    if(success){
      localStorage.setItem('token', result.token);
      navigate("/dashboard");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
        <img src={Logo} alt="skill sage" height={70} width={70}/>
        <span style={{fontSize: "20px", fontWeight: "bold"}}>Skill Sage</span>
        
        </div>
        <br/>
        <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
      </Card>
    </div>
  );
};

export default Login;
