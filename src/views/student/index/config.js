import { Button, Popconfirm } from 'antd'

const genderMap = {
    0: '女',
    1: '男'
}

function renderColumns ({ handleEdit, handleDel }) {

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: '班级',
            dataIndex: 'class',
            key: 'class',
            align: 'center'
        },
        {
            title: '兴趣',
            dataIndex: 'interest',
            key: 'interest',
            align: 'center'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            align: 'center',
            render: (value) => genderMap[value]
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
                            title="确定删除该条记录吗?"
                            onConfirm={() => handleDel({ _id: record._id })}
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