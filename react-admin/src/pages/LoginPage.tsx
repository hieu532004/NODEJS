import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import axios from 'axios';
import { env } from '../constants/getEnvs';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from 'react-router';


const LoginPage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { setTokens, tokens, setUser } = useAuthStore();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        try {
            const responseLogin = await axios.post(`${env.API_URL}/v1/auth/login`,
                {
                    email: values.email,
                    password: values.password,
                });
            console.log(responseLogin);
            if (responseLogin.status === 200) {
                // 1: save token
                setTokens(responseLogin.data.data);
                //-----------------
                // 2: lấy thông tin Profile cua user vừa login thành công
                const responseProfile = await axios.get(
                    `${env.API_URL}/v1/auth/get-profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${responseLogin.data.data.accessToken}`,
                    },
                });
                //-------------------
                // 3: Lưu thông tin Profile vào local storage
                if (responseProfile.status === 200) {
                    setUser(responseProfile.data.data);
                    //ToDo: navigate to Dashboard
                    navigate('/');
                }       
                //-------------------
                // 4: chuyển hướng sang trang Dashboard
                
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Email or password invalid!',
                });
            }
        } catch (error) {
            console.error('error', error);
            messageApi.open({
                type: 'error',
                content: 'Email or password invalid!',
            });

        }
    };

    return (
        <Flex justify="center" align="center" style={{ height: '100vh' }}>
            {contextHolder}
            <Form
                name="login"
                initialValues={{
                    remember: true,
                    email: 'admin@gmail.com',
                    password: '12345678'
                }}
                style={{ maxWidth: 360 }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default LoginPage;