//import React from "react";

const apiRequest = async (url = "", optionObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionObj);
    if (!response.ok) throw Error("YOu need reload the page");
  } catch (e) {
    errMsg = e.Message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
