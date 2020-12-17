import { Button, Form, Input, Row, Col } from 'antd'
import { deteleUser, queryUser } from '../../../apis/user/index'
import renderColumns from './config'
import BuildPage from '../../../hooks/useBuildPage'
import Modal from './model'

function User (props) {
    return (
        <div>
            <Row>
                <Col span={22}>
                    <Form form={props.form} {...props.layout} name="basic" onFinish={props.onFinish} style={{ marginBottom: '15px' }}>
                        <Form.Item label="用户名" name="userName">
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => props.reset()}>重置</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={2}>
                    <Button type="dashed" onClick={() => props.handleAdd()} style={{ marginLeft: '20px' }}>新增用户</Button>
                </Col>
            </Row>
        </div >
    );
}

const config = {
    handleQuery: queryUser,
    handleDel: deteleUser,
    renderColumns,
    isHasTable: true,
    Modal
}

function renderPage (props) {
    return BuildPage(User, props, config)
}

export default renderPage