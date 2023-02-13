import { Button, Checkbox, Form, Input, Typography, Row, Col } from 'antd'
import { Link } from 'react-router-dom';

const { Title } = Typography

const RegisterForm = ({ onFinish, onFinishFailed }) => {

    return (
        <Row type="flex" justify="center" style={{ minHeight: '100vh' }}>
            <Col span={16} >
                <Title style={{ marginBottom: 40 }} level={2}>Login Page</Title>
                <Form
                    name="basic"

                    labelCol={{ flex: '90px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}

                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <div className='cnRegister'>Already have an account? <Link to="/">Sign in</Link></div>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default RegisterForm;