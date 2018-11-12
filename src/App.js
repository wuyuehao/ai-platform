import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb,Row, Col ,Icon} from 'antd';


import Home from './components/Home'
import Jupyter from './components/Jupyter'
import UploadModel from './components/UploadModel'
import QuickServe from './components/QuickServe'
import Train from './components/Train'
import Track from './components/Track'
import PropTypes from 'prop-types';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
    path: "/upload",
    sidebar: () => <div>Upload</div>,
    main: () => <h2><UploadModel/></h2>
  },
  {
    path: "/serve",
    sidebar: () => <div>Serve</div>,
    main: () => <h2><QuickServe/></h2>
  },
  {
    path: "/train",
    sidebar: () => <div>Train</div>,
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
    main: () => <h2><Track/></h2>
  },
  {
    path: "/deploy",
    sidebar: () => <div>Deploy!</div>,
    main: () => <h2>Deploy</h2>
  }
];





class App extends Component {

  contextTypes :{
    router: PropTypes.object
  }

  handleClick = (e) => {
    console.log('click ', e.key);
    //this.context.router.push(e.key);
  }


  render() {
    return (
      <Layout className="layout">
        <Header>
          <h1><font color="white">TCS Management Portal</font></h1>
        </Header>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Router>
      <Row type="flex" justify="top">
          <Col span={6}>
          <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>TCS Sandbox</span></span>}>

              <Menu.Item key="/upload"><Link to='/upload'>Upload Model</Link></Menu.Item>
              <Menu.Item key="/serve"><Link to='/serve'>Serving</Link></Menu.Item>


          </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>AI Playground</span></span>}>
              <MenuItemGroup key="g2" title="Hyperparamater Search">
                <Menu.Item key="/train"><Link to='/train'>Submit Jobs</Link ></Menu.Item>
                <Menu.Item key="/track"><Link to='/track'>Tracking</Link></Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="setting" /><span>Tool Box</span></span>}>
              <Menu.Item key="5">Under Construction</Menu.Item>
              <Menu.Item key="6">Under Construction</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Under Construction</Menu.Item>
                <Menu.Item key="8">Under Construction</Menu.Item>
              </SubMenu>
            </SubMenu>

          </Menu>

      </Col>
      <Col span={18}>

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
