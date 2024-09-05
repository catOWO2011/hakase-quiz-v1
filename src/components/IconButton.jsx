import { DeleteFilled, EditFilled, PlayCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

export const StyledIconButton = styled(Button)`
  background-color: #f4978e;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #ee9d9a !important;
    color: #f8edeb !important;
    border: #f8ad9d solid !important;
  }
`;

export const StyledEditIcon = styled(EditFilled)`
  color: #f8edeb;
  &:hover {
    color: #ffdab9;
  }
`;

export const StyledDeleteIcon = styled(DeleteFilled)`
  color: #f8edeb;
  &:hover {
    color: #ffdab9;
  }
`;

export const StyledPlayIcon = styled(PlayCircleFilled)`
  color: #f8edeb;
  &:hover {
    color: #ffdab9;
  }
`;
