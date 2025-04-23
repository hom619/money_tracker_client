import axios from "axios";
const rootAPIEndpoint = "http://localhost:8000/api/v1";
const apiProcessor = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.mesage,
    };
  }
};
//post new user
export const postUser = (data) => {
  const obj = {
    method: "post",
    url: rootAPIEndpoint + "/users",
    data,
  };
  return apiProcessor(obj);
};
