import { queryMenusAndPermission } from "@/apis/login"
import store from '@/store'

function saveMenusAndPermissionsAndRoutes (menus, permissions, routes) {
  store.commit("setPermissions", permissions)
  store.commit("setMenus", menus)
  store.commit("setRoute", routes)
}


function getPermissions (data) {
  return data.map(item => item.action)
}

function setTreeData (data) {
  const { length } = data
  for (let i = 0; i < length; i++) {
    const item = data[i]
    for (let j = 0; j < length; j++) {
      const currentItem = data[j]
      if (item.menuId === currentItem.parentId) {
        item.children = item.children || []
        item.children.push(currentItem)
      }
    }
  }
}

function getMenusAndRoutes (data) {
  let menus = []
  let routes = []
  setTreeData(data)
  const { length } = data
  for (let i = 0; i < length; i++) {
    const item = data[i]
    if (item.parentId === 0) {
      menus.push(item)
    }
    if (!item.children) {
      routes.push(item)
    }
  }
  return { menus, routes }
}

async function setMenusAndPermission () {
  const [error, data] = await queryMenusAndPermission()
  if (error) {
    console.log(error)
  } else {
    const { menus, routes } = getMenusAndRoutes(data.data.menus)
    const permissions = getPermissions(data.data.permissions)
    saveMenusAndPermissionsAndRoutes(menus, permissions, routes)
  }
}

export { setMenusAndPermission }
