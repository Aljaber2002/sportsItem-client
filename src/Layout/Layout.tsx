// import React from "react";
import { Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch } from "@/Redux/hook";
import { logout } from "@/Redux/Features/login/LoginSlice";

const { Header, Content } = Layout;

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: String(index + 1),
//   label: `nav ${index + 1}`,
// }));

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const items = [
    {
      key: "01",
      label: "sportsItems",
      children: [
        {
          key: "view",
          label: <NavLink to="/sports-items">sportsItemsManagement</NavLink>,
        },
        {
          key: "view1",
          label: <NavLink to="/add-item">AddItem</NavLink>,
        },
      ],
    },

    {
      key: "03",
      label: <NavLink to="/sales-history">SalesHistory</NavLink>,
    },
    {
      key: "04",
      label: <span onClick={handleLogout}>logout</span>,
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "" }}>
        <div
          style={{
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
