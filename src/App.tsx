import { useSelector } from "react-redux";
import Login from "./containers/login/Login";
import { useEffect } from "react";


function App() {
  const root = document.querySelector(":root");
  const reduxTheme = useSelector((state)=>state.themeReducer)
  
  console.log(reduxTheme);
  
  const value = localStorage.getItem("theme");
  useEffect(() => {
    console.log(value)
    if (value==='dark') root?.classList.add("dark");
    else root?.classList.remove("dark");
  });

  return (
    <div className="border-box m-2 h-screen flex items-center">
      <Login />
    </div>
  );
}

export default App;
