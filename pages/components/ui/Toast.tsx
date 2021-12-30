import React, { Dispatch, SetStateAction, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

interface Props {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  duration?: number;
}

const bottomSlideIn = keyframes`
  from {
    bottom: 0px;
  }

  to {
    bottom: 50px;
  }
`;

const Container = styled.div`
  position: absolute;
  background-color: #ffffff;
  padding: 20px;
  border: 2px solid #000000;
  border-radius: 8px;
  box-shadow: 2px 2px 2px #000000;
  animation: ${bottomSlideIn} 1s;
  left: 50px;
  bottom: 50px;
`;

const Toast = ({
  message,
  setMessage,
  duration = 3000,
}: Props): React.ReactElement | null => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, setMessage]);

  const root =
    typeof window !== "undefined" && document.getElementById("__next");
  if (!root) return null;

  return ReactDOM.createPortal(
    message && <Container>{message}</Container>,
    root
  );
};

export default Toast;
