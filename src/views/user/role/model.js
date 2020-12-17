import { Form, Input, Modal, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { roleCreate, roleUpdate } from '../../../apis/user/role'
import { queryMenu } from "../../../apis/user/menu";
import { permissionQuery } from "../../../apis/user/permission";


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};

const Model = (props) => {

    const [form] = Form.useForm()

    const [isRefresh, setIsRefresh] = useState(false);

    const [menus, setMenus] = useState([])

    const [actions, setActions] = useState([])

    const [checkedmenuKeys, setCheckedMenuKeyss] = useState([]);

    const [checkedActionKeys, setCheckedActionKeys] = useState([]);

    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(props.formData)
        setCheckedMenuKeyss(props.formData.menuIds)
        setCheckedActionKeys(props.formData.permissionIds)
    }, [form, isRefresh, props.formData])

    useEffect(() => {
        const setKeys = (data) => {
            const { length } = data
            for (let i = 0; i < length; i++) {
                const item = data[i]
                item.key = item.menuId
                if (item.children && item.children.length) {
                    setKeys(item.children)
                }
            }
        }

        const getMenus = async () => {
            const [error, data] = await queryMenu();
            if (error) {
                console.log(error);
            } else {
                setKeys(data.data)
                setMenus(data.data)
            }
        }
        const getPermission = async () => {
            const [error, data] = await permissionQuery();
            if (error) {
                console.log(error);
            } else {
                setKeys(data.data)
                setActions(data.data);
            }
        }
        getMenus()
        getPermission()
    }, [setMenus, setActions])

    const handleForm = async (callback, params) => {
        const [error, data] = await callback(params)
        if (error) {
            console.log(error)
        } else {
            message.success(data.data.message)
            props.setVisible(false)
            props.setIsRefresh(!props.isRefresh)
        }
    }

    const submit = () => {
        form.validateFields().then(({ roleName }) => {
            const params = { roleName, menuIds: checkedmenuKeys, permissionIds: checkedActionKeys.filter(item => typeof item === 'string'), roleId: props.formData.roleId }
            handleForm(props.isCreate ? roleCreate : roleUpdate, params)
        })
    }

    const cancel = () => {
        props.setVisible(false)
        setIsRefresh(!isRefresh)
    }

    const treeConfig = {
        autoExpandParent: true,
        checkable: true,
        defaultExpandAll: true,
        titleRender: (nodeData) => nodeData.menuName
    }

    const onCheckMenus = (e) => {
        setCheckedMenuKeyss(e)
    }

    const onCheckActions = (e) => {
        setCheckedActionKeys(e)
    }

    return (
        <Modal
            forceRender
            width={700}
            title={props.isCreate ? '新建角色' : '编辑角色'}
            visible={props.visible}
            onOk={submit}
            onCancel={cancel}
        >
            <Form form={form} {...layout} name="basic">
                <Form.Item label="角色名" name="roleName" rules={[{ required: true, message: '请输入角色名' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="菜单" name="menuIds">
                    <Tree treeData={menus} {...treeConfig} checkedKeys={checkedmenuKeys} onCheck={onCheckMenus}></Tree>
                </Form.Item>
                <Form.Item label="权限" name="permissionIds">
                    <Tree treeData={actions} {...treeConfig} checkedKeys={checkedActionKeys} onCheck={onCheckActions}></Tree>
                </Form.Item>
            </Form>
        </Modal >
    );
};

Model.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    isRefresh: PropTypes.bool,
    setIsRefresh: PropTypes.func,
    isCreate: PropTypes.bool,
    formData: PropTypes.object
};

export default Model