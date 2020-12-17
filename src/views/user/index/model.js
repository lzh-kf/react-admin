import { Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUser, updateUser, } from '../../../apis/user/index'
import { roleQueryAll } from '../../../apis/user/role';
import useModel from '../../../hooks/useModel';
import md5 from "blueimp-md5";

const { Option } = Select

const Model = (props) => {

    const [roles, setRoles] = useState([])

    useEffect(() => {
        const getRoles = async () => {
            const [error, data] = await roleQueryAll()
            if (error) {
                console.log(error)
            } else {
                setRoles(data.data)
            }
        }
        getRoles()
    }, [])

    return (
        <Form form={props.form} {...props.layout} name="basic">
            <Form.Item label="用户名" name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="用户账号" name="userAccount" rules={[{ required: true, message: '请输入用户账号' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: props.isCreate, message: '请输入用户密码' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="角色" name="roleId" rules={[{ required: true, message: '请选择角色名' }]}>
                <Select allowClear mode={'multiple'}>
                    {
                        roles.map(item => <Option value={item.roleId} key={item.roleId}>{item.roleName}</Option>)
                    }
                </Select>
            </Form.Item>
        </Form>
    );
};

const config = {
    handleCreate: createUser,
    handleUpdate: updateUser,
    createTitle: '新建用户',
    editTitle: '编辑用户',
    setParams: (values, props) => {
        const params = { ...values, _id: props.formData._id }
        if (params.password) {
            params.password = md5(params.password)
        }
        return params
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