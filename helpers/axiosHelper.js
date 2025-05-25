import axios from "axios";
const rootAPIEndpoint = "http://localhost:8000/api/v1";
const getToken = () => {
  return localStorage.getItem("accessJWT");
};

const apiProcessor = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error?.response?.data?.error || error.mesage,
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
//get user
export const getUser = () => {
  const obj = {
    method: "get",
    url: rootAPIEndpoint + "/users/",
    headers: {
      Authorization: getToken(),
    },
  };
  return apiProcessor(obj);
};
//login
export const loginUser = (data) => {
  const obj = {
    method: "post",
    url: rootAPIEndpoint + "/users/login",
    data,
  };
  return apiProcessor(obj);
};

//post new transaction
export const postTransaction = (data) => {
  const obj = {
    method: "post",
    url: rootAPIEndpoint + "/transactions",
    data,
    headers: {
      Authorization: getToken(),
    },
  };

  return apiProcessor(obj);
};
