import React, { useState, useEffect } from "react";

const Public = () => {
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch("/public")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Response not ok");
      })
      .then(({ message }) => setMessage(message))
      .catch(({ message }) => setMessage(message));
  }, []);

  return <div>{message}</div>;
};

export default Public;
