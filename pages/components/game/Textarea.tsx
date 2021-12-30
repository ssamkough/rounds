import styled from "styled-components";

const Textarea = styled.textarea.attrs({ cols: 40, rows: 5 })`
  width: 600px;
  height: 100px;
  padding: 10px;
  font-size: 2em;
  resize: none;
`;

export default Textarea;
