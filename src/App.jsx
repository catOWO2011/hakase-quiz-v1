import { Header } from "./components";
import PageContent from "./pages/PageContent";

function App() {

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <PageContent />
    </div>
  );
}

export default App
