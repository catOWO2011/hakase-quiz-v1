import { Header } from "./components";
import PageContent from "./pages/PageContent";

function App() {

  return (
    // <>
    //   <div className="w-screen h-auto flex flex-col">
    //     <Header />
    //   </div>
    //   <Outlet />
    // </>
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <PageContent />
    </div>
  );
}

export default App
