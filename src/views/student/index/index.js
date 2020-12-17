import { Button, Form, Input, Select, Row, Col } from 'antd'
import { querStudent, deteleStudent } from '../../../apis/student/index'
import useBuildPage from '../../../hooks/useBuildPage'
import renderColumns from './config'
import Modal from '../model'

const { Option } = Select

function Student (props) {

    return (
        <div>
            <Row>
                <Col span={22}>
                    <Form form={props.form} {...props.layout} name="basic" onFinish={props.onFinish} style={{ marginBottom: '15px' }}>
                        <Form.Item label="用户名" name="name">
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item label="班级" name="class">
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item label="兴趣" name="interest">
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item label="性别" name="gender">
                            <Select style={{ width: 120 }} allowClear>
                                <Option value="0">女</Option>
                                <Option value="1">男</Option>
                            </Select>
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
                    <Button type="dashed" onClick={() => props.handleAdd({
                        gender: "1"
                    })} style={{ marginLeft: '20px' }}>新增学生</Button>
                </Col>
            </Row>
        </div>
    );
}

const config = {
    handleQuery: querStudent,
    handleDel: deteleStudent,
    renderColumns,
    isHasTable: true,
    Modal
}

function BuildPage (props) {
    return useBuildPage(Student, props, config)
}

export default BuildPage