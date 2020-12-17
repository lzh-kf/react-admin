import request from "../request";

const login = (data = {}) => {
  return request({
    method: "post",
    url: "/login",
    data
  });
};

const logout = (data = {}) => {
  return request({
    method: "post",
    url: "/logout",
    data
  });
};

const queryMenusAndPermission = () => {
  return request({
    method: "get",
    url: "/queryMenusAndPermission"
  });
};

export { login, logout, queryMenusAndPermission };
