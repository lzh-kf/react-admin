import request from "@/utils/request";

const createUser = (data = {}) => {
  return request({
    method: "post",
    url: "/user/create",
    data
  })
}

const updateUser = (data = {}) => {
  return request({
    method: "post",
    url: "/user/update",
    data
  })
}

const deteleUser = (data = {}) => {
  return request({
    method: "delete",
    url: "/user/del",
    data
  })
}

const queryUser = data => {
  return request({
    method: "post",
    url: "/user/query",
    data
  })
}

export { createUser, updateUser, deteleUser, queryUser }
