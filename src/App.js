import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb,Row, Col } from 'antd';


import Home from './components/Home'
import Jupyter from './components/Jupyter'
import Train from './components/Train'

const { Header, Sider ,Content, Footer } = Layout;
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <div><Home/></div>
  },
  {
    path: "/jupyter",
    sidebar: () => <div>Jupyter!</div>,
    main: () => <div><Jupyter/></div>
  },
  {
    path: "/train",
    sidebar: () => <div>Train!</div>,
    main: () => <h2><Train/></h2>
  },
  {
    path: "/tune",
    sidebar: () => <div>Tune!</div>,
    main: () => <h2>Tune</h2>
  },
  {
    path: "/track",
    sidebar: () => <div>Track!</div>,
    main: () => <h2>Track</h2>
  },
  {
    path: "/deploy",
    sidebar: () => <div>Deploy!</div>,
    main: () => <h2>Deploy</h2>
  }
];


class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />

        </Header>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Router>
        <Row type="flex" justify="top">
          <Col span={2}>
            <div
              style={{
                padding: "10px",
                width: "100%",
                background: "#f0f0f0"
              }}
            >
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jupyter">Jupyter</Link>
                </li>
                <li>
                  <Link to="/train">Train</Link>
                </li>
                <li>
                  <Link to="/tune">Tune</Link>
                </li>
                <li>
                  <Link to="/track">Track</Link>
                </li>
                <li>
                  <Link to="/deploy">Deploy</Link>
                </li>
              </ul>

              {routes.map((route, index) => (
                // You can render a <Route> in as many places
                // as you want in your app. It will render along
                // with any other <Route>s that also match the URL.
                // So, a sidebar or breadcrumbs or anything else
                // that requires you to render multiple things
                // in multiple places at the same URL is nothing
                // more than multiple <Route>s.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.sidebar}
                />
              ))}
            </div>

            </Col>
            <Col span={22}>

          <div style={{ flex: 1, padding: "10px" }}>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
            </div>
        </Col>
        </Row>
          </Router>
        </Layout>



        <Footer style={{ textAlign: 'center' }}>
          AI Platform©2018 Created by Tony WU
        </Footer>
      </Layout>
    );
  }
}


export default App;
