import React, { useState } from "react";
import Login from "./Login";
import Main from "./Main";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <div>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <Main token={token} />
      )}
    </div>
  );
}

export default App;
