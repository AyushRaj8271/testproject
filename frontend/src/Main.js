import React, { useEffect, useState } from "react";

function Main({ token }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/main", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Access denied"));
  }, [token]);

  return (
    <div>
      <h2>Main Section</h2>
      <p>{message}</p>
    </div>
  );
}

export default Main;
