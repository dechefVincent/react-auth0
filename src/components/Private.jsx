import React, { useState, useEffect } from "react";

const Private = ({ auth }) => {
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch("/private", {
      headers: { Authorization: "Bearer " + auth.getAccessToken() },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Response not ok");
      })
      .then(({ message }) => setMessage(message))
      .catch(({ message }) => setMessage(message));
  }, [auth]);

  return <div>{message}</div>;
};

export default Private;
