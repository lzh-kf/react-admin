import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { createStudent, updateStudent } from '../../apis/student/index';
import useModel from '../../hooks/useModel';

const { Option } = Select

const Model = (props) => {

    return (
        <Form form={props.form} {...props.layout} name="basic">
            <Form.Item label="名字" name="name" rules={[{ required: true, message: '请输入你的名字' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="班级" name="class" rules={[{ required: true, message: '请输入你的班级' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="兴趣" name="interest" rules={[{ required: true, message: '请输入你的兴趣' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择你的性别' }]}>
                <Select style={{ width: 120 }}>
                    <Option value="0">女</Option>
                    <Option value="1">男</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

const config = {
    handleCreate: createStudent,
    handleUpdate: updateStudent,
    createTitle: '创建学生',
    editTitle: '编辑学生',
    setParams: (values, props) => {
        return { ...values, _id: props.formData._id }
    }
}

function BuildModel (props) {
    return useModel(Model, props, config)
}

BuildModel.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    isRefresh: PropTypes.bool,
    setIsRefresh: PropTypes.func,
    isCreate: PropTypes.bool,
    formData: PropTypes.object
};

export default BuildModel