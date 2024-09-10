import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import PageContent from "./PageContent";
import styled from "styled-components";

const StyledContainer = styled.div`
  .ant-layout-content {
    overflow-y: scroll;
  }
`;

export default function AppLayout() {
  return (
    <StyledContainer className="flex flex-col w-screen h-screen py-8 px-4 m-auto bg-[#f8edeb] ">
      <ToastContainer />
      <Header />
      <PageContent />
    </StyledContainer>
  );
}