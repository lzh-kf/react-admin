import { Button, Form, Input, Row, Col } from 'antd'
import { roleDel, roleQuery } from '@/apis/user/role'
import BuildPage from '@/hooks/useBuildPage'
import renderColumns from './config'
import Modal from './model'

function Role (props) {

    return (
        <div>
            <Row>
                <Col span={22}>
                    <Form form={props.form} {...props.layout} name="basic" onFinish={props.onFinish} style={{ marginBottom: '15px' }}>
                        <Form.Item label="角色名" name="roleName">
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
                    <Button type="dashed" onClick={() => props.handleAdd()} style={{ marginLeft: '20px' }}>新增角色</Button>
                </Col>
            </Row>
        </div >
    );
}

const config = {
    handleQuery: roleQuery,
    handleDel: roleDel,
    renderColumns,
    isHasTable: true,
    Modal
}

function renderPage (props) {
    return BuildPage(Role, props, config)
}

export default renderPage