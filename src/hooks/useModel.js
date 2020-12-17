import { useState, useEffect } from 'react';
import { Form, Modal, message } from 'antd';

function useBuildModel (PageComponent, props, config) {

    const [form] = Form.useForm()

    const [isRefresh, setIsRefresh] = useState(false);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(props.formData)
    }, [form, props.formData, isRefresh])

    const handleSubmit = async (callback, params) => {
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
        form.validateFields().then(values => {
            const params = config.setParams(values, props)
            handleSubmit(props.isCreate ? config.handleCreate : config.handleUpdate, params)
        })
    }

    const cancel = () => {
        props.setVisible(false)
        setIsRefresh(!isRefresh)
    }

    const customProps = {
        form,
        layout
    }

    return (
        <Modal
            forceRender
            title={props.isCreate ? config.createTitle : config.editTitle}
            visible={props.visible}
            onOk={submit}
            onCancel={cancel}
        >
            <PageComponent {...customProps} {...props}></PageComponent>
        </Modal>
    );
}

export default useBuildModel