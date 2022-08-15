import React, {Component} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {connect} from 'dva';
import PT from 'prop-types';

LoginForm.propsTypes = {
  loginform: PT.instanceOf({
    username: PT.string,
    password: PT.string,
    remember: PT.bool,
  }).isRequired,
}

LoginForm.defaultProps = {
  loginform: {
    remember: false,
  },
}

function LoginForm(props) {
  const {
    loginform: {username,password,remember}
  } = props;  

  const onFinish = ({username,password,remember}) => {
    props.dispatch({
      type: 'loginform/submit',
      payload: {
        username,
        password,
        remember
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: remember,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        wrapperCol={{ sm: 24, span: 16, offset: 1 }}
        style={{ width: "90%", marginRight: 0 }}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        value={username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        wrapperCol={{ sm: 24, span: 16, offset: 1 }}
        style={{ width: "90%", marginRight: 0 }}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        value={password}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

function mapStateToProps(state) {
  //console.log(state);
  return state;
}

export default connect(mapStateToProps)(LoginForm);