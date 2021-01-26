import request from "@/utils/request"

const createMenu = (data = {}) => {
  return request({
    method: "post",
    url: "/menu/create",
    data
  })
}

const updateMenu = (data = {}) => {
  return request({
    method: "post",
    url: "/menu/update",
    data
  })
}

const deteleMenu = (data = {}) => {
  return request({
    method: "delete",
    url: "/menu/del",
    data
  })
}

const queryMenu = data => {
  return request({
    method: "post",
    url: "/menu/query",
    data
  })
}

export { createMenu, updateMenu, deteleMenu, queryMenu }
