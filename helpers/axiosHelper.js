import axios from "axios";
const rootAPIEndpoint = import.meta.env.VITE_ROOT_URL + "/api/v1";
console.log("API Endpoint: ", rootAPIEndpoint);
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

// ### Transactions API

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

//get all transactions
export const getTransactions = () => {
  const obj = {
    method: "get",
    url: rootAPIEndpoint + "/transactions",
    headers: {
      Authorization: getToken(),
    },
  };
  return apiProcessor(obj);
};

// Update transactions
export const updateTransaction = (data) => {
  const obj = {
    method: "patch",
    url: rootAPIEndpoint + "/transactions",
    data,
    headers: {
      Authorization: getToken(),
    },
  };
  return apiProcessor(obj);
};

// Delete transactions
export const deleteTransactions = (data) => {
  const obj = {
    method: "delete",
    url: rootAPIEndpoint + "/transactions",
    data,
    headers: {
      Authorization: getToken(),
    },
  };
  return apiProcessor(obj);
};
export const deleteTransactionById = (id) => {
  const obj = {
    method: "delete",
    url: rootAPIEndpoint + "/transactions/id",
    data: { transactionId: id },
    headers: {
      Authorization: getToken(),
    },
  };
  return apiProcessor(obj);
};
