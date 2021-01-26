import { Form, Input, Modal, Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { createMenu, updateMenu } from "@/apis/user/menu";

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

const Model = (props) => {

    const [form] = Form.useForm()

    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(props.formData)
    }, [form, props.formData, isRefresh])

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

    const setParams = (values) => {
        let params = { ...props.formData, ...values };
        const { ids = [] } = params;
        const { length } = ids;
        if (props.isCreated) {
            params.parentId = ids[length - 1];
        } else {
            if (ids[length - 1] === params.menuId) {
                params.parentId = ids[length - 2];
            } else {
                params.parentId = ids[length - 1];
            }
        }
        return params;
    }

    const submit = () => {
        form.validateFields().then(values => {
            handleForm(props.isCreate ? createMenu : updateMenu, setParams(values))
        })
    }

    const cancel = () => {
        props.setVisible(false)
        setIsRefresh(!isRefresh)
    }

    return (
        <Modal
            forceRender
            title={props.isCreate ? '创建菜单' : '编辑菜单'}
            visible={props.visible}
            onOk={submit}
            onCancel={cancel}
        >
            <Form form={form} {...layout}>
                <Form.Item name="menuName" label="菜单名" rules={[{ required: true, message: '请输入菜单名' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="path" label="页面路径" rules={[{ required: true, message: '请输入路径' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="归属菜单" name="ids">
                    <Cascader options={props.menus} fieldNames={{
                        label: 'menuName',
                        value: 'menuId',
                        children: 'children'
                    }} changeOnSelect />
                </Form.Item>
                <Form.Item name="componentFilePath" label="组件路径" rules={[{ required: true, message: '请输入组件路径' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

Model.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    menus: PropTypes.array,
    isRefresh: PropTypes.bool,
    setIsRefresh: PropTypes.func,
    isCreate: PropTypes.bool,
    formData: PropTypes.object
};

export default Model