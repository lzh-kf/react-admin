import request from "@/utils/request"

const upload = (data) => {
  return request({
    method: "post",
    url: "/base/upload",
    headers: {
      "content-type": "multipart/form-data"
    },
    data
  })
}

export { upload }
