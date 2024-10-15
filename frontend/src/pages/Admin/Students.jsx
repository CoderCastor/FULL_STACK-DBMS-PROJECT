import React, { useState } from "react";
import RandomString from "../../components/RandomString";

function Students() {
  const [token, setToken] = useState("");
  const TokenFetcher = (token) => {
    setToken(token)
    console.log(token);
    
  };

  return (
    <div>
      <RandomString TokenFetcher={TokenFetcher} />
    </div>
  );
}

export default Students;
