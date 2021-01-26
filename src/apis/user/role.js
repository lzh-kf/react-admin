import request from "@/utils/request"

const roleCreate = (data = {}) => {
  return request({
    method: "post",
    url: "/role/create",
    data
  })
}

const roleDel = (data = {}) => {
  return request({
    method: "delete",
    url: "/role/del",
    data
  })
}

const roleUpdate = (data = {}) => {
  return request({
    method: "post",
    url: "/role/update",
    data
  })
}

const roleQuery = data => {
  return request({
    method: "post",
    url: "/role/query",
    data
  })
}

const roleQueryAll = data => {
  return request({
    method: "post",
    url: "/role/queryAll",
    data
  })
}

export { roleCreate, roleDel, roleUpdate, roleQuery, roleQueryAll }
