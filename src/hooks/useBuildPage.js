import { Form, message, Table } from 'antd';
import { useState, useEffect } from 'react';
import usePaginationConfig from './usePaginationConfig'

function useRenderPageComponent (PageComponent, props, config) {

    const { list, setList, setTotal, pagination, paginationConfig } = usePaginationConfig();

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const [searchParams, setSearchParams] = useState({});

    const [visible, setVisible] = useState(false)

    const [isRefresh, setIsRefresh] = useState(false)

    const [isCreate, setIsCreate] = useState(true)

    const [formData, setFormData] = useState({})

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        layout: 'inline'
    }

    const handleEdit = (record) => {
        setFormData(record)
        setIsCreate(false)
        setVisible(true)
    }

    const handleAdd = (formData = {}) => {
        setFormData(formData)
        setIsCreate(true)
        setVisible(true)
    }

    const handleDel = async (params) => {
        const [error, data] = await config.handleDel(params)
        if (error) {
            console.log(error)
        } else {
            message.success(data.data.message)
            setIsRefresh(!isRefresh)
        }
    }

    const onFinish = (values) => {
        setSearchParams(values)
    }

    const reset = () => {
        form.resetFields()
        setSearchParams({})
    }

    const customProps = {
        form,
        layout,
        handleAdd,
        onFinish,
        reset,
        handleEdit,
        handleDel,
        list
    }

    useEffect(() => {

        const setQueryParams = () => {
            if (config.isHasTable) {
                return { ...pagination, ...searchParams }
            } else {
                return searchParams
            }
        }

        const handleQuery = async () => {
            setLoading(true)
            const [error, data] = await config.handleQuery(setQueryParams())
            if (error) {
                console.log(error)
            } else {
                // 自定义处理数据
                config.handleData && config.handleData(data)
                // 有表格
                if (config.isHasTable) {
                    const { list, count } = data.data;
                    setList(list)
                    setTotal(count)
                } else {
                    setList(data.data)
                }
            }
            setLoading(false)
        }
        handleQuery()

    }, [pagination, setList, setTotal, searchParams, isRefresh, config.handleQuery, config.handleData, config.isHasTable, config])

    return (
        <>
            <PageComponent {...customProps} {...props}></PageComponent>
            {config.isHasTable && (
                <Table loading={loading} dataSource={list} columns={config.renderColumns && config.renderColumns({ handleDel, handleEdit })} pagination={paginationConfig} rowKey={(record) => record._id} />
            )}
            {config.Modal && (
                <config.Modal visible={visible} setVisible={setVisible} isCreate={isCreate} formData={formData} setIsRefresh={setIsRefresh} isRefresh={isRefresh}></config.Modal>
            )}
        </>
    )
}

export default useRenderPageComponent