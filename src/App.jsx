import { useState } from "react";
import UserList from "./UserList.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserList />
    </>
  );
}

export default App;
