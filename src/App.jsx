import { Outlet } from "react-router-dom";
import { Header } from "./components";

function App() {

  return (
    <div className="w-screen h-auto flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

export default App
