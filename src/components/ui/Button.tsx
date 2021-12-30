import styled from "styled-components";

const Button = styled.button.attrs({ type: "button" })`
  cursor: pointer;
  color: inherit;
  font-size: 1.5em;
  padding: 8px;
  border: 2px solid black;
  border-radius: 6px;
  background-color: white;
  box-shadow: 1px 1px 1px #000000;

  &:hover {
    background-color: black;
    color: white;
  }
`;

export default Button;
