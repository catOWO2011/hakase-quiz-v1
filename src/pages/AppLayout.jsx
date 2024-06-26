import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/Header"
import PageContent from "./PageContent"

export default function AppLayout() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <ToastContainer />
      <Header />
      <PageContent />
    </div>
  )
}