import React from 'react';
import { SmileOutlined, CrownOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons';

import Login from '~/pages/Login';

export default [
  {
    path: '/login',
    name: 'login',
    exact: false,
    component: Login,
    icon: <SmileOutlined />,
  },
  {
    path: '/admin',
    name: 'admin',
    exact: false,
    icon: <CrownOutlined />,
    access: 'canAdmin',
    authority: ['admin'],
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page1',
        name: 'sub-page1',
        icon: <CrownOutlined />,
        component: './Welcome',
      },
      {
        path: '/admin/sub-page2',
        name: 'sub-page2',
        icon: <CrownOutlined />,
        component: './Welcome',
      },
      {
        path: '/admin/sub-page3',
        name: 'sub-page3',
        icon: <CrownOutlined />,
        component: './Welcome',
      },
    ],
  },
  {
    name: 'List',
    icon: <TabletOutlined />,
    path: '/list',
    exact: false,
    component: './ListTableList',
    routes: [
      {
        path: '/list/sub-page',
        name: 'sub-page',
        icon: <CrownOutlined />,
        routes: [
          {
            path: 'sub-sub-page1',
            name: 'sub-sub-page1',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
          {
            path: 'sub-sub-page2',
            name: 'sub-sub-page2',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
          {
            path: 'sub-sub-page3',
            name: 'sub-sub-page3',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
        ],
      },
      {
        path: '/list/sub-page2',
        name: 'sub-page2',
        icon: <CrownOutlined />,
        component: './Welcome',
      },
      {
        path: '/list/sub-page3',
        name: 'sub-page3',
        icon: <CrownOutlined />,
        component: './Welcome',
      },
    ],
  },
  {
    path: 'https://cloud.oncx.vn',
    name: 'unified communication',
    exact: false,
    icon: <AntDesignOutlined />,
  }
];