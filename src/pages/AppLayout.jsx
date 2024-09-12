import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import PageContent from "./PageContent";

export default function AppLayout() {
  return (
    <>
      <ToastContainer />
      <Header />
      <PageContent />
    </>
  );
}