import React, { useState } from 'react';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { LikeOutlined, UserOutlined, MehOutlined } from '@ant-design/icons';
import styles from './Layout.less';
import _ from 'lodash';
import logo_oncx_4 from '~/images/logo_4.png';
import logo_oncx_3 from '~/images/logo_3.svg';
import ProLayout, { BasicLayout, PageContainer, SettingDrawer } from '@ant-design/pro-layout';
import {connect} from 'dva';
import PT from 'prop-types';
import {Route, Switch, Link} from 'dva/router';
import NoFoundPage from '~/pages/404';

const content = (
  <Descriptions size="small" column={1}>
    <Descriptions.Item label="PhoneNumber: ">Lorem Ipsum</Descriptions.Item>
  </Descriptions>
);

function RouteMapper(routes,history) {
  return routes.map((route, i) => (
    <Route exact={route.exact} path={route.path}  key={i} render={props =>(
      <route.component {...props} routes={route?.routes} history={history} />
    )}></Route>
  ));
}



const Layout = ({global, props, dispatch, routes, history, location}) => {
  
  const { collapsed, authorized } = global;
  const [settings, setSetting] = useState({ fixSiderbar: true });
  const [pathname, setPathname] = useState('/');
  const [puremode, setPureMode] = useState(false) ;
  const [isloading, setLoading] = useState(false);
  const [modal, setIsOpen] = useState({ isOpen: true});
  const [userAgent, setUserAgent] = useState({});
  const [defaultProps, setDefaultProps] = useState({route: {routes}, location: location})
  
  const onLogout = () => {
    dispatch({
      type: 'global/logout',
      payload: {}
    })
  };

  return (
    <div>
      <ProLayout
        {...defaultProps}
        style={{
          width: '48vh',
          height: '32vh',
          margin: 0,
          fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif`,
          position: 'relative',
        }}
        pure={puremode}
        loading={isloading}
        title="ONCX"
				logo={!collapsed ? logo_oncx_4 : logo_oncx_3 }
        waterMarkProps={{
          content: 'cloud.oncx.vn',
        }}
        menuFooterRender={(props) => {
          return (
            <a
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              href="https://preview.pro.ant.design/dashboard/analysis"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src="https://procomponents.ant.design/favicon.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: '0 16px',
                  marginRight: 10,
                }}
              />
              {!props?.collapsed && 'Power by FPT'}
            </a>
          );
        }}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/');
              history.push(item.path);
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="circle" size="small" icon={<UserOutlined />} />
          </div>
        )}
        {...settings}
      >
        <PageContainer
          content={authorized && content}
          tabList={[
            {
              tab: 'Call',
              key: 'call',
            },
            {
              tab: 'Profile',
              key: 'profile',
            },
          ]}
          footer={ !authorized ? [
						<Button key="2">Register</Button>,
            <Button key="1" type="primary">
              <Link to="/login">Login</Link>
            </Button>,
          ] : [<Button key="1" type="primary" onClick={onLogout}>Logout</Button>]}
        >
          <div
            style={{
              height: '60vh',
            }}
          >
            <Result
              icon={<MehOutlined />}
              style={{
                height: '100%',
                background: '#fff',
              }}
              title={authorized && 'Hello\t' + global?.user || 'Please Login' }
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary"><Link to="/login">Back Home</Link></Button>}
            />
          </div>
        </PageContainer>
			</ProLayout>
    </div>
  );
}

Layout.propTypes = {
  dispatch: PT.func.isRequired,
  settings: PT.instanceOf(Object),
  location: PT.shape({
    pathname: PT.string,
  }).isRequired,
  user: PT.shape({
    authToken: PT.string,
    userId: PT.string,
    compId: PT.string,
    ext: PT.string,
    licenseModule: PT.instanceOf(Array), 
  }).isRequired,
  userAgent: PT.instanceOf(Object).isRequired,
  routes: PT.instanceOf(Object)
}

Layout.defaultProps = {
  settings: {},
  userAgent: {},
  user: {
    authToken: '',
    userId: '',
    compId: '',
    orgId: '',
    ext: '',
    licenseModule: []
  }
}

function mapStateToProps({global}) {
  return {global};
}

export default connect(mapStateToProps)(Layout);