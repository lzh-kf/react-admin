import request from "../request";

const createStudent = (data = {}) => {
  return request({
    method: "post",
    url: "/student/create",
    data
  });
};

const updateStudent = (data = {}) => {
  return request({
    method: "post",
    url: "/student/update",
    data
  });
};

const deteleStudent = (data = {}) => {
  return request({
    method: "delete",
    url: "/student/del",
    data
  });
};

const querStudent = data => {
  return request({
    action: "student.query",
    method: "post",
    url: "/student/query",
    data
  });
};

const donwloadStudentInfo = data => {
  return request({
    method: "post",
    url: "/student/download",
    data,
    responseType: "ArrayBuffer"
  });
};

export {
  createStudent,
  updateStudent,
  deteleStudent,
  querStudent,
  donwloadStudentInfo
};
