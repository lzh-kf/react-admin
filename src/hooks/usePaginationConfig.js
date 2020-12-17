import { useState } from 'react';

function usePaginationConfig () {
    
    const [list, setList] = useState([]);

    const [total, setTotal] = useState(0);
    
    const [pagination, setPagination] = useState({
        pageNum: 1,
        pageSize: 10,
    })

    const onChange = (page, pageSize) => {
        setPagination({
            pageNum: page,
            pageSize,
        })
    }

    const paginationConfig = {
        current: pagination.pageNum,
        defaultCurrent: pagination.pageNum,
        defaultPageSize: pagination.pageSize,
        showQuickJumper: true,
        showSizeChanger: 50,
        pageSizeOptions: ['10', '20', '30', '40'],
        showTotal: (total) => `总共 ${total} 条数据`,
        total,
        onChange
    }

    return {
        list,
        setList,
        setTotal,
        pagination,
        paginationConfig
    }
}

export default usePaginationConfig