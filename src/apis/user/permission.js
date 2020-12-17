import request from "../request";

const permissionCreate = (data = {}) => {
  return request({
    method: "post",
    url: "/permission/create",
    data
  });
};

const permissionDel = (data = {}) => {
  return request({
    method: "delete",
    url: "/permission/del",
    data
  });
};

const permissionUpdate = (data = {}) => {
  return request({
    method: "post",
    url: "/permission/update",
    data
  });
};

const permissionQuery = data => {
  return request({
    action: "permission.query",
    method: "post",
    url: "/permission/query",
    data
  });
};

export { permissionCreate, permissionDel, permissionUpdate, permissionQuery };
