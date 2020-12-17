import { Tree, Button, Popconfirm } from 'antd';
import { permissionDel, permissionQuery } from "../../../apis/user/permission";
import { findParentElement } from "../../../utils/index";
import BuildPage from '../../../hooks/useBuildPage'
import styles from './index.module.css';
import Modal from './model'


function Permission (props) {

    const renderTitle = (nodeData) => {
        return (
            <div className={styles.font13}>
                <span>{nodeData.menuName}</span>
                <Button type="link" className={styles.font13} size="small" onClick={() => handleEdit(nodeData)} disabled={nodeData.permissionId ? false : true}>编辑</Button>
                <Popconfirm
                    title="确定删除该权限吗?"
                    onConfirm={() => props.handleDel({ _id: nodeData._id })}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button type="link" className={styles.font13} size="small" disabled={!nodeData.permissionId}>删除</Button>
                </Popconfirm>
            </div>
        )
    }

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
    return (
        <div>
            <Button type="primary" className={styles.createMenu + ' ' + styles.font13} size="small" onClick={() => { props.handleAdd() }}>添加权限</Button>
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
    handleQuery: permissionQuery,
    handleDel: permissionDel,
    handleData: (data) => setKeys(data.data),
    isHasTable: false,
    Modal,
}

function renderPage (props) {
    return BuildPage(Permission, props, config)
}

export default renderPage