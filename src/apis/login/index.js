import request from "@/utils/request"

const login = (data = {}) => {
  return request({
    method: "post",
    url: "/login",
    data
  })
}

const logout = (data = {}) => {
  return request({
    method: "post",
    url: "/logout",
    data
  })
}

const queryMenusAndPermission = () => {
  return request({
    method: "get",
    url: "/queryMenusAndPermission"
  })
}

const refreshToken = () => {
  return request({
    method: "post",
    url: "/refreshToken"
  })
}

export { login, logout, queryMenusAndPermission, refreshToken }
