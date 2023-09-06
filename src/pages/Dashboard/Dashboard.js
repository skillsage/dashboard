import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  TeamOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Courses, Jobs } from "../index";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div style={{ margin: 0 }}>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        {/* Side Bar */}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            onSelect={({ key }) => setSelectedMenuItem(key)}
            items={[
              {
                key: "0",
                label: "SS Dashboard",
                disabled: true,
              },
              {
                key: "1",
                icon: <TeamOutlined />,
                label: "Job",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Course",
              },
              {
                key: "3",
                icon: <BarChartOutlined />,
                label: "Analytics",
              },
            ]}
          />
        </Sider>
        <Layout>
          {/* Header */}
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
              <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => navigate("/")}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                float: "right",
              }}
            />
          </Header>
          {/* Content */}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              height: 200,
              background: colorBgContainer,
              overflowY: 'auto',
            }}
          >
            {selectedMenuItem === "1" && <Jobs />}
            {selectedMenuItem === "2" && <Courses />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;