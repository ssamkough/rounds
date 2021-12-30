import styled, { css } from "styled-components";
import Button from "../ui/Button";

const ChoiceButton = styled(Button)<{ isSelected: boolean }>`
  font-size: 40px;
  padding: 16px;
  width: 400px;
  border-radius: 24px;
  ${({ isSelected }) =>
    isSelected &&
    css`
      background: #000000;
      color: #ffffff;
    `}
`;

export default ChoiceButton;
