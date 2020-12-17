import { Button, Popconfirm } from 'antd'

function renderColumns ({ handleEdit, handleDel }) {
    const columns = [
        {
            title: '角色名',
            dataIndex: 'roleName',
            key: 'name',
            align: 'center'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
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
                            title="确定删除该角色吗?"
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