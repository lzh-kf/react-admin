import { Form, Input, Button } from 'antd';
import styles from './index.module.css';
import React from 'react';
import { login } from "../../apis/login/index";
import { setSession } from '../../utils/cache'
import store from '../../store/index'
import md5 from "blueimp-md5";

function Login ({ history }) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const setParams = (values) => {
    const params = { ...values }
    params.password = md5(params.password)
    return params
  }

  const onFinish = async values => {
    const [error, data] = await login(setParams(values))
    if (error) {
      console.log(error)
    } else {
      const { token, userInfo } = data.data
      setSession.token = token
      setSession.userInfo = userInfo
      store.commit('setUser', userInfo)
      history.push('/menu')
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <h4 className={styles.h4}>自定义后台管理系统</h4>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="userAccount"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
        </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}



export default Login;
