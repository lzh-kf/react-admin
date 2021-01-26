import { Tree, Button, Popconfirm } from 'antd';
import { queryMenu, deteleMenu } from "@/apis/user/menu";
import BuildPage from '@/hooks/useBuildPage'
import { findParentElement } from "@/utils/index";
import styles from './index.module.css';
import Modal from './model'

function Menu (props) {

    const handleEdit = (record) => {
        const tempdata = { ...record };
        // 非顶级菜单
        if (tempdata.parentId !== 0) {
            const parentIds = findParentElement(
                props.list,
                tempdata.parentId,
                props.list,
            ).map(item => item.menuId);
            tempdata.ids = [...parentIds, tempdata.menuId];
        } else {
            tempdata.ids = []
        }
        props.handleEdit(tempdata)
    }

    const renderTitle = (nodeData) => {
        return (
            <div className={styles.font13}>
                <span>{nodeData.menuName}</span>
                <Button type="link" className={styles.font13} size="small" onClick={() => handleEdit(nodeData)}>编辑</Button>
                <Popconfirm
                    title="确定删除该菜单吗?"
                    onConfirm={() => props.handleDel({ _id: nodeData._id })}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button type="link" className={styles.font13} size="small">删除</Button>
                </Popconfirm>
            </div>
        )
    }

    return (
        <div>
            <Button type="primary" className={styles.createMenu + ' ' + styles.font13} size="small" onClick={() => { props.handleAdd() }}>添加菜单</Button>
            <Tree className={styles.content} treeData={props.list} titleRender={renderTitle}></Tree>
        </div>
    )
}

function setKeys (data) {
    const { length } = data
    for (let i = 0; i < length; i++) {
        const item = data[i]
        item.key = item._id
        if (item.children && item.children.length) {
            setKeys(item.children)
        }
    }
}

const config = {
    handleQuery: queryMenu,
    handleDel: deteleMenu,
    handleData: (data) => setKeys(data.data),
    isHasTable: false,
    Modal
}

function renderPage (props) {
    return BuildPage(Menu, props, config)
}

export default renderPage