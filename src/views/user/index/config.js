import { Button, Popconfirm } from 'antd'

function renderColumns ({ handleEdit, handleDel }) {
    const columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            align: 'center'
        },
        {
            title: '用户账号',
            dataIndex: 'userAccount',
            key: 'userAccount',
            align: 'center'
        },
        {
            title: '角色ID',
            dataIndex: 'roleId',
            key: 'roleId',
            align: 'center'
        },
        {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate',
            align: 'center'
        },
        {
            title: '更新时间',
            dataIndex: 'updateDate',
            key: 'updateDate',
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (value, record) => {
                return (
                    <div key={value}>
                        <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: '10px' }}>编辑</Button>
                        <Popconfirm
                            title="确定删除该用户吗?"
                            onConfirm={() => handleDel(record)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type="primary" danger>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]
    return columns
}

export default renderColumns